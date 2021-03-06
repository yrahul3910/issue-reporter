# Issue Reporter
An issue reporting system, which filters out duplicate issues. LSA implementation inspired by [Chris McCormick's repository](https://github.com/chrisjmccormick/LSA_Classification). [This repo](https://github.com/kernelmachine/pyLSA/blob/master/lsa.py) and [this one](https://github.com/llazzaro/lsa_python) are also worth looking at. However, the `kernelmachine/pyLSA` one seems to rely on web scraping.

# Setup
To replicate the setup, ensure that you have MongoDB, Node.js, and yarn installed. MongoDB Compass is useful for debugging. The following Python 3 packages are required:  

* `sklearn`
* `nltk`, with the `stopwords` corpus downloaded
* `numpy`
* `bcrypt`
* `pymongo`
* `PyJWT`
* `flask`
* `pycodestyle`

Run `mongod` in a terminal to start the MongoDB server. Then, run `run.sh` to install dependencies, lint code, and start the project.

# Project Structure
The code is structured as follows.

# Routing
Front end routing is done via React Router (`react-router-dom`). The `Main` component contains the routes to all paths that are resolved at the front end.

# React Components
These are in the `components` folder.
* `Dashboard`: The dashboard showing all the issues after the organization admins have logged in.
* `Home`: This is the component (including the sidebar) that the user sees after logging in. It's a welcome page for the user after logging in. The user here is the organization admin.
* `Main`: An abstraction for the routes of the app.
* `Sidebar`: The sidebar shown after the admin has logged in.
* `IssueCard`: The element showing an issue on the dashboard.
* `Welcome`: The page shown after the user has logged in.
* `IssuePage`: The page with the `Sidebar` and the `Dashboard` components.
* `Banner`: The navbar and banner of the main home page.
* `Login`: The page for organizations to log in
* `MainPage`: The main home page of the website.
* `Register`: The page for organizations to register.

## NPM Scripts
The scripts are used as below:
* `lint:watch`: Runs `lint`, which lints the code, and watches for changes in code and re-runs `lint` each time.
* `build`: Builds the `dist` files to be served by Flask.

## Configuration Files
* `.babelrc` is used for transpiling React and ES6/ES7 code to plain JS.
* `.editorconfig` enforces indenting and other configurations for editors and IDEs.
* `.eslintrc.json` is the ESLint config file.

# Database
MongoDB is used as the database. There are two collections:

## Issues
The format of a document in this collection is:
```
{
    _id: Auto generated id,
    username: The username of the user who opened the issue,
    title: A title given by the user,
    org: The organization the issue is submitted to (the username),
    location: The area the issue is reported in,
    date: The date the issue was opened,
    status: A string that the organization can set to update the status
}
```

## Users
This is used for both users and organizations. Format is:
```
{
    _id: Auto generated id,
    name: The name of the user/organization,
    username: Username chosen by the user/organization,
    pwd: The password, encrypted by bcrypt
}
```

# TODO
This is still a work in progress. As such, there's still a lot left to be done.
* The organization dashboard should allow the admins to view the details of all the duplicate issues, and also change the status.
