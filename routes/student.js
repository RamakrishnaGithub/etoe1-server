const express = require('express');
const mongodb = require("mongodb");
const objectId = mongodb.ObjectId;
const getDb = require('../common/dbConn');
const router = express.Router();



router.post('/register', async function (req, res, next) {
    try {
        const data = req.body.data
        const db = await getDb()
        const collection = db.collection('students')
        const result = await collection.insertOne(data)
        res.send(result)
    } catch (ex) {
        res.send(ex.message)
    }
})

router.get("/get-std", async function (req, res, next) {
    try {
        const db = await getDb();
        const collection = db.collection("students")
        const result = await collection.find().toArray()
        res.send(result)
    } catch (ex) {
        res.send(ex.message)
    }
})

router.put("/update-std", async function (req, res, next) {
    try {
        const id = req.query.id
        const data = req.body.data
        const db = await getDb()
        const collection = db.collection("students")
        const result = await collection.updateOne({ _id: objectId.createFromHexString(id) }, { $set: data })
        res.send(result)
    } catch (ex) {
        console.error(ex)
        res.send(ex)
    }

})

router.delete("/delete-std/:id", async function (req, res, next) {
    try {
        const id = req.params.id
        const db = await getDb()
        const collection = db.collection("students")
        const result = await collection.deleteOne({ _id: objectId.createFromHexString(id) })
        res.send(result)
    } catch (ex) {
        console.error(ex)
        res.send(ex)
    }
})

router.post("/login", function (req, res, next) {
    const { uid, pwd } = req.body
    if (uid == "nit" && pwd == "nitnit") {
        res.send([{ uid, pwd }])
    } else {
        res.send([])
    }
})
module.exports = router;