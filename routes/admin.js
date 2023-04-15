const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct
);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product',
    [
        body('title')
            .trim()
            .isString()
            .isLength({ min: 3 }),

        // body(
        //     'imageUrl'
        // )
        //     .trim()
        //     .isURL(),

        body(
            'price'
        )
            .trim()
            .isFloat(),

        body('description')
            .trim()
            .isLength({ min: 5, max: 400 })
    ],
    isAuth,
    adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
    '/edit-product',
    [
        body('title')
            .trim()
            .isString()
            .isLength({ min: 3 }),

        // body(
        //     'imageUrl'
        // )
        //     .trim()
        //     .isURL(),

        body(
            'price'
        )
            .trim()
            .isFloat(),

        body('description')
            .trim()
            .isLength({ min: 5, max: 400 })
    ],
    isAuth,
    adminController.postEditProduct
);

//router.post('/delete-product', isAuth, adminController.postDeleteProduct);

router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = router;
