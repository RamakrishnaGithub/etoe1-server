const express = require('express');
const mongodb = require("mongodb");
const objectId = mongodb.ObjectId;
const getDb = require('../common/dbConn');
const jwt = require("jsonwebtoken")
const router = express.Router();
var validateToken=require("../common/validateToken")


router.post('/register',validateToken
    , async function (req, res, next) {
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

router.get("/get-std",validateToken,  async function (req, res, next) {
    try {
        const db = await getDb();
        const collection = db.collection("students")
        const result = await collection.find().toArray()
        res.send(result)
    } catch (ex) {
        res.send(ex.message)
    }
})

router.put("/update-std",validateToken, async function (req, res, next) {
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

router.delete("/delete-std/:id",validateToken, async function (req, res, next) {
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
    if (uid === "nit" && pwd === "nitnit") {
        const token = jwt.sign({ uid, pwd }, "appToken")
        res.send([{ uid, pwd, token }])
    } else {
        res.send([])
    }
})
module.exports = router;