const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/login',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email.'),
        //.normalizeEmail(),

        body(
            'password',
            'Please enter a password with only number and text and atleast 5 characters long'
        )
            .isAlphanumeric()
            .isLength({ min: 5 })
            .trim()
    ],
    authController.postLogin
);

router.post(
    '/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => { // value is the input and the 2nd parameter is optional where we can get more info
                // if (value === 'test@test.com') {
                //     throw new Error('This email is forbidden');
                // }
                // return true;
                return User.findOne({ email: value }).then(userData => {
                    if (userData) {
                        return Promise.reject(
                            'Email already exsist.'
                        )
                    }
                });
            })
            .normalizeEmail(),
        body(
            'password',
            'Please enter a password with only number and text and atleast 5 characters long'
        ) // the 2nd parameter is the message which will work with every check
            .isAlphanumeric()
            .isLength({ min: 6 })
            .trim(),
        body('confirmPassword').trim().custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password should match!');
            }
            return true;
        })
    ],
    authController.postSignup
);

router.post('/logout', isAuth, authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;