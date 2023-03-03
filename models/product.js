// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

//const mongoConnect = require('../util/database');
const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectID(id) : null;
  }

  save() {
    const db = getDb();
    let dbOp;
    //db.collection('product').insertOne({ name: 'Book', price: 12 }); pass the value in object to insert.
    if (this._id) {
      // update product
      dbOp = db.collection('product').updateOne({_id: this._id}, { $set: this });
    } else {
      dbOp = db.collection('product').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
    .collection('product')
    .find()
    .toArray()
    .then(products => {
      console.log("products ->", products);
      return products;
    })
    .catch(err => {
      console.log("err in fetchAll ->",err);
    })
  }

  static findById(prodId){
    let id = new mongodb.ObjectID(prodId);
    const db = getDb();
    return db
    .collection('product')
    .findOne({'_id': id})
    .then(product => {
      console.log("product ->", product);
      return product;
    })
    .catch(err => {
      console.log("err in fetchAll ->",err);
    })
  }

  static deleteById(prodId){
    let id = new mongodb.ObjectID(prodId);
    const db = getDb();
    return db
    .collection('product')
    .deleteOne({'_id': id})
    .then(result => {
      console.log("Deleted");
    })
    .catch(err => {
      console.log("err in deleteById ->",err);
    })
  }
}

module.exports = Product;
