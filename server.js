import express from "express";
import path from "path";
import open from "open";
import compression from "compression";
import dotenv from "dotenv";
import session from "express-session";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import {MongoClient as mongo} from "mongodb";
import bcrypt from "bcrypt";
import callApi from "./api.js";

// Used for transpiling
import webpack from "webpack";
import config from "./webpack.config";

const port = 8000;
const app = express();
const compiler = webpack(config);
dotenv.config();

// gzip files
app.use(compression());
app.use(session({secret: process.env.SECRET, resave: true, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("images"));
// Use Webpack middleware
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/index.html"));
});

// API Routes
let apiRoutes = express.Router();
app.use("/api", apiRoutes);

apiRoutes.post("/authenticate/:type", (req, res) => {
    mongo.connect(process.env.MONGO_URL, (err, db) => {
        let coll = db.collection("users");

        coll.findOne({
            username: req.body.username,
            type: req.body.type
        }, (e, user) => {
            if (e) throw e;

            if (!user)
                res.json({success: false, message: "User does not exist."});
            else {
                bcrypt.compare(req.body.password, user.pwd, (e_, r) => {
                    if (e_) throw e_;

                    if (!r)
                        res.json({success: false, message: "Incorrect password"});
                    else {
                        let token = jwt.sign(user, process.env.SECRET, {
                            expiresIn: "1 day"
                        });

                        res.json({
                            success: true,
                            message: "Authenticated successfully.",
                            user: {
                                _id: user._id,
                                name: user.name,
                                username: user.username,
                                dp: user.dp
                            },
                            token
                        });
                    }
                });
            }
            db.close();
        });
    });
});

apiRoutes.post("/register", (req, res) => {
    mongo.connect(process.env.MONGO_URL, (err, db) => {
        if (err) throw err;

        let users = db.collection("users");
        users.findOne({
            username: req.body.username,
            type: req.body.type
        }, (e, user) => {
            if (e) throw e;

            if (user)
                res.json({ success: false, message: "Username already exists!" });
            else {
                bcrypt.hash(req.body.password, 10, (e_, hash) => {
                    if (e_) throw e_;

                    users.insert({
                        username: req.body.username,
                        name: req.body.name,
                        pwd: hash,
                        dp: "",
                        type: req.body.type
                    });
                });
                res.json({ success: true, message: "Success!" });
            }
        });
    });
});

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

apiRoutes.get("/issues", (req, res) => {
    let user = req.decoded;
    res.writeHead(200, {"Content-Type": "application/json"});

    mongo.connect(process.env.MONGO_URL, (err, db) => {
        if (err) throw err;

        let coll = db.collection("issues");
        coll.find({
            uid: user._id
        }).toArray((e, docs) => {
            if (e) throw e;

            res.end(JSON.stringify({
                success: true,
                data: docs
            }));
        });
    });
});

apiRoutes.post("/issues/new", (req, res) => {

    let user = req.decoded;
    if (user.type == "org") {
        res.writeHead(403, {"Content-Type": "application/json"});
        res.end(JSON.stringify({success: false, message: "Not allowed."}));
        return;
    }
    res.writeHead(200, {"Content-Type": "application/json"});

    mongo.connect(process.env.MONGO_URL, (err, db) => {
        if (err) throw err;

        let coll = db.collection("issues");
        coll.insertOne({
            uid: user._id,
            title: req.body.title,
            org: req.body.org,
            location: req.body.location,
            date: new Date(),
            status: "New issue"
        }, (e, d) => {
            if (e) throw e;

            res.end(JSON.stringify({
                success: true,
                message: "New issue added successfuly."
            }));
        });
    });
});

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

app.listen(port, (err) => {
    if (err) throw err;
    open("http://localhost:" + port);
});
