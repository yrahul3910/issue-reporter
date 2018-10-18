
// req.decoded is the decoded token--the user.

apiRoutes.get("/filter", (req, res) => {

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
