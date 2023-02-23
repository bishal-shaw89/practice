const path = require('path');
const express = require('express');
const router = express.Router();

const productsController = require("../controllers/products");

//const adminData = require('./admin');

// router.use('/', (req, res, next) => {
//     res.send('<h1>Hello from Express!!</h1>');
// })

// '.get or .post' will match the exact route, while '.use' will only match the starting.
// router.get('/', (req, res, next) => {
//     //res.send('<h1>Hello from Express!!</h1>');
//     //res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));

//     const products = adminData.products;
//     res.render('shop', {
//         prods: products,
//         pageTitle: 'Shop',
//         path: '/',
//         hasProducts: products.length > 0,
//         activeShop: true,
//         productsCSS: true
//     })
// })

router.get('/', productsController.getProducts);

module.exports = router;