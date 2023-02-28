const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://bishalshaw:WOhr2CwRkjHfuK9c@node.qd8frbo.mongodb.net/?retryWrites=true&w=majority')
        .then(client => {
            console.log("Success");
            _db = client.db('shop'); //shop is the database name to connect
            callback();
        }).catch(err => {
            console.log("err ->", err);
        })
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No database found!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;