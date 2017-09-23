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


// Used for transpiling
import webpack from "webpack";
import config from "./webpack.config";

const port = 8000;
const app = express();
const compiler = webpack(config);
dotenv(config);

// gzip files
app.use(compression());
app.use(session({secret: process.env.SECRET, resave: true, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
                        dp: ""
                    });
                });
                res.json({ success: true, message: "Success!" });
            }
        });
    });
});

app.listen(port, (err) => {
    if (err) throw err;
    open("http://localhost:" + port);
});
