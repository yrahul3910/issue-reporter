import callApi from "./api.js";

apiRoutes.use((req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err)
                res.json({success: false, message: "Failed to authenticate token"});
            else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: "No token provided."
        });
    }
});

// req.decoded is the decoded token--the user.

apiRoutes.get("/filter", (req, res) => {
    let user = req.decoded;
    if (user.type == "user") {
        res.writeHead(403, {"Content-Type": "application/json"});
        res.end(JSON.stringify({success: false, message: "Not allowed"}));
    }
    res.writeHead(200, {"Content-Type": "application/json"});

    mongo.connect(process.env.MONGO_URL, (err, db) => {
        if (err) throw err;

        let coll = db.collection("issues");
        coll.find({
            _id: user._id
        }).toArray((e, docs) => {
            // Use the API to get duplicates.
            let result = docs.reduce((acc, cur) => {
                let dup = false;
                for (let x of acc) {
                    let res;
                    if ((res = callApi(process.env.API_KEY, cur.title, x.title).success)) {
                        if (res.similarity >= 0.75) {
                            dup = true;
                            break;
                        }
                    }
                }
                if (!dup) {
                    acc.push(cur);
                }
            }, []);
            res.end(JSON.stringify({success: true, data: result}));
        });
    });
});
