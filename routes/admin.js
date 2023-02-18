const path = require('path');
const express = require('express');
const router = express.Router();

//we can use same route as we got two different methods, get and post.

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    //res.send('<form action="/admin/add-product" method="post"><input type="text" name="title"><button type="submit">Submit</button>');
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
})

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    console.log(JSON.parse(JSON.stringify(req.body)));
    res.redirect('/');
})

module.exports = router;