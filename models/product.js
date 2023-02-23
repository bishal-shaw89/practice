//const products = [];
const path = require('path');
const fs = require('fs');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFormFile = callBack => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callBack([]);
        } else {
            callBack(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        //products.push(this);
        // fs.readFile(p, (err, fileContent) => {
        //     let products = [];
        //     if (!err) {
        //         products = JSON.parse(fileContent);
        //     }
        //     products.push(this);
        //     fs.writeFile(p, JSON.stringify(products), (err) => {
        //         console.log(err);
        //     })
        // })
        getProductsFormFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })
    }

    static fetchAll(callBack) {
        getProductsFormFile(callBack);
        // fs.readFile(p, (err, fileContent) => {
        //     if (err) {
        //         callBack([]);
        //     }
        //     callBack(JSON.parse(fileContent));
        // })
        //return products;
    }
}