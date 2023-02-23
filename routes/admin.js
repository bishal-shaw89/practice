const path = require('path');
const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

//const products = [];

//we can use same route as we got two different methods, get and post.

// /admin/add-product => GET
// router.get('/add-product', (req, res, next) => {
//     //res.send('<form action="/admin/add-product" method="post"><input type="text" name="title"><button type="submit">Submit</button>');
//     //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));

//     res.render('add-product', {
//         pageTitle: 'Add Product',
//         path: '/admin/add-product',
//         formsCSS: true,
//         productCSS: true,
//         activeAddProduct: true
//     })
// })

router.get('/add-product', productsController.getAddProducts);

// /admin/add-product => POST
// router.post('/add-product', (req, res, next) => {
//     //console.log(JSON.parse(JSON.stringify(req.body)));
//     products.push({ title: req.body.title })
//     res.redirect('/');
// })

router.post('/add-product', productsController.postAddProduct);

module.exports = router;
// exports.routes = router;
// exports.products = products;