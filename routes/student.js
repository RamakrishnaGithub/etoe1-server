const express = require('express');
const mongodb = require("mongodb")
const router = express.Router();



router.post('/register',async function (req, res, next) {
    try{
        const data = req.body.data
        const MongoClient = mongodb.MongoClient
        const server=await MongoClient.connect("mongodb+srv://u1:p1@ramcluster.cagoz53.mongodb.net/")
        const db=server.db("sms")
        const collection=db.collection('students')
        const result=await collection.insertOne(data)
        res.send(result)
    }catch(ex){
        res.send(ex.message)
    }
    })

module.exports = router;