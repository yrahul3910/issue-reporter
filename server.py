from flask import Flask, send_from_directory, request, Response
from LSA import LSA
import bcrypt
import pymongo
import jwt
import re
import time

# Use the dist/ directory as the static files directory.
app = Flask(__name__,
            static_folder='dist',
            static_url_path='/')
client = pymongo.MongoClient('localhost', 27017)
db = client.get_database('issues')
illegal_chars_regex = re.compile(r'[!@#$%^&*()+\-=[\]{};\':"\\|,.<>/?]')
secret = 'skjszd*A87yjhdkjszdhkl@#U8ukSH@*#&238232398'


@app.route('/api/user/signup', methods=['POST'])
def user_signup():
    """
    Handles the user signup. Accepts a JSON object with
    ```
    {
        username: string,
        name: string,
        password: string,
        type: string
    }
    ```
    Hashes the password with bcrypt using a salt, and adds to the
    database if the username does not already exist. If successful,
    returns a 200 OK with the syntax
    ```
    {
        success: true,
        token: string
    }
    ```
    where token is a JSON Web Token. If the username exists, the
    response returns a 409 Conflict, with the body:
    ```
    {
        success: false,
        error: string
    }
    ```
    """
    # Get request parameters
    data = request.get_json()
    username = data['username']
    name = data['name']
    pwd = data['password']
    user_type = data['type']

    # Check basic errors
    if username is None or name is None or pwd is None or \
            username.isspace() or name.isspace() or pwd.isspace():
        return Response('{"success":false, error:"Invalid parameters"}',
                        status=400, mimetype='application/json')

    if illegal_chars_regex.match(username) or illegal_chars_regex.match(name):
        return Response('{"success":false, error:"Invalid characters"}',
                        status=400, mimetype='application/json')

    if ' ' in username:
        error_msg = '{"success":false, error:"Username cannot have spaces"}'
        return Response(error_msg, status=400, mimetype='application/json')

    # Hash the password with salt
    hashed = bcrypt.hashpw(pwd.encode('utf8'), bcrypt.gensalt())

    user_coll = db.get_collection('users')

    # Get a list of colliding usernames
    colliding_usernames = user_coll.find_one({
        'username': username,
        'type': user_type
    })
    if colliding_usernames is None:
        # No collisions, we can insert
        user_coll.insert_one({
            'username': username,
            'name': name,
            'password': hashed.decode('utf8'),
            'type': user_type
        })

        # Generate a token and respond with a 200 OK.
        encoded = jwt.encode({
            'username': username,
            'name': name,
            'type': user_type
        }, secret, headers={
            'expiresIn': '1 day'
        })

        succ_res = '{"success":true, "token":"' + encoded.decode('utf8') + '"}'
        return Response(succ_res, status=200, mimetype='application/json')
    else:
        # There were collisions, respond with a 409 Conflict
        return Response('{"success":false}', status=409,
                        mimetype='application/json')


@app.route('/api/user/login', methods=['POST'])
def user_login():
    """
    Implements user login. Accepts credentials as
    ```
    {
        username: string,
        password: string,
        type: string
    }
    ```
    If the authentication details succeed,
    then creates a JWT and returns it to the client with a 200 OK.
    The success response is
    ```
    {
        success: true,
        token: string
    }
    ```
    In case of auth failure, a 401 Unauthorized is returned.
    ```
    {
        success: false,
        error: string
    }
    ```
    """
    data = request.get_json()
    username = data['username']
    pwd = data['password']
    user_type = data['type']

    user_coll = db.get_collection('users')
    matched_user = user_coll.find_one({
        'username': username,
        'type': user_type
    })
    if matched_user is None:
        # Username does not exist. Give a vague error for
        # security reasons.
        return Response('{"success":false,"error":"Invalid credentials"}',
                        status=401, mimetype='application/json')
    else:
        if bcrypt.checkpw(pwd.encode('utf8'),
                          matched_user['password'].encode('utf8')):
            # Auth successful
            encoded = jwt.encode({
                'username': username,
                'name': matched_user['name'],
                'type': user_type
            }, secret, headers={
                'expiresIn': '1 day'
            })
            succ_res = '{"success":true, "token":"' + \
                encoded.decode('utf8') + '"}'
            return Response(succ_res, status=200, mimetype='application/json')
        else:
            # Auth failure
            return Response('{"success":false,"error":"Invalid credentials"}',
                            status=401, mimetype='application/json')


@app.route('/api/issues/new', methods=['POST'])
def new_issue():
    """
    Creates a new issue. Accepts a request with
    ```
    {
        token: string,
        title: string,
        desc: string,
        org: string,
        location: string
    }
    ```
    Additionally, the server adds two fields:
        date: <current date>
        status: "New"
    """
    data = request.get_json()
    token = data['token']
    title = data['title']
    org = data['org']
    desc = data['desc']
    location = data['location']
    date = int(time.time() * 1000)
    status = 'New'
    user = jwt.decode(token, secret)

    if user['type'] == 'org':
        return Response('{"success": false, "error": "Not allowed."}',
                        status=403, mimetype='application/json')
    issue_col = db.get_collection('issues')
    issue_col.insert_one({
        'username': user['username'],
        'title': title,
        'desc': desc,
        'org': org,
        'location': location,
        'date': date,
        'status': status
    })

    return Response('{"success": true}', status=200,
                    mimetype='application/json')


@app.route('/api/issues/filter', methods=['POST'])
def filter_issues():
    """
    Returns a list of filtered issues. Accepts JSON with
    ```
    {
        token: string,
        threshold: Number
    }
    ```
    Returns a 200 OK with
    ```
    {
        success: true,
        filtered: [
            {
                issues: [
                    {
                        title: string,
                        desc: string,
                        location: string
                    }
                ],
                title: string
            }
        ]
    }
    ```
    The `title` field is simply the `title` of the first document in
    the similarity collection.
    """
    data = request.get_json()
    token = data['token']
    threshold = data['threshold']
    user = jwt.decode(token, secret)

    if user['type'] == 'user':
        return Response('{"success": false, "error": "Not allowed."}',
                        status=403, mimetype='application/json')

    issue_col = db.get_collection('issues')
    issues = issue_col.find({
        'username': user['username']
    })

    lsa = LSA()
    lsa.vectorize_data()

    filtered = []
    for i in range(len(issues)):
        issues_i = []  # issues similar to issue i
        doc1 = issues[i]
        v1 = lsa.transform([doc1['desc']])

        for j in range(i + 1, len(issues)):
            doc2 = issues[j]
            v2 = lsa.transform([doc2['desc']])

            similarity = lsa.cosine_similarity(v1, v2)
            if similarity >= threshold:
                issues_i.append({
                    'title': doc2['title'],
                    'desc': doc2['desc'],
                    'location': doc2['location']
                })

        if len(issues_i) > 0:
            filtered.append({
                'issues': issues_i,
                'title': issues_i[0]['title']
            })

    return Response('{"success": true, "filtered":' + str(filtered) + '}',
                    status=200, mimetype='application/json')


@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def static_files(path):
    """
    Static files handler. / defaults to index.html, and the
    other files are matched via the expression.
    """
    return app.send_static_file(path)
