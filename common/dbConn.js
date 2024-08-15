var mongodb=require("mongodb")
async function getDb(){
    const MongoClient = mongodb.MongoClient
        const server=await MongoClient.connect("mongodb+srv://u1:p1@ramcluster.cagoz53.mongodb.net/")
        const db=server.db("sms")
        return db;
}
module.exports=getDb