const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller - Login', function () {

    before(function (done) { // before will run only once before start the test cases.
        mongoose
            .connect(
                'mongodb+srv://bishalshaw:WOhr2CwRkjHfuK9c@node.qd8frbo.mongodb.net/test-messages',
                { useNewUrlParser: true, useUnifiedTopology: true }
            )
            .then(result => {
                const user = new User({
                    email: 'test@test.com',
                    password: '123456',
                    name: 'test',
                    posts: [],
                    _id: '644809062d2e13df9ba8acb2'
                });
                return user.save();
            })
            .then(() => {
                done();
            })
    })

    // difference between 'before' and 'beforeEach' : 'beforeEach' runs before every test cases before each 'it' function and 'before' only runs once.

    it('should throw an error with code 500 if accessing the database fails', function (done) { // if we add 'done' in argument mocha wants to find the done in the code
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
            body: {
                email: 'test@test.com',
                password: '123456'
            }
        };

        AuthController.login(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500); // it expect a property of 'statusCode' of which has a value of 500
            done(); // we add done so that we can tell mocha to wait for the above function to execute and wait for result.
        });

        User.findOne.restore();
    });

    it('should send a response with a valid user status for an exsiting user', function (done) {

        const req = { userId: '644809062d2e13df9ba8acb2' };
        const res = {
            statusCode: 500,
            userStatus: null,
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.userStatus = data;
            }
        };
        AuthController.getUserStatus(res, req, () => { })
            .then(() => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.userStatus).to.be.equal('I am new!');
                done();
            })
    });

    after(function (done) { // it will excute after all the test cases are done.
        User.deleteMany({})
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            });
    })

    // difference between 'after' and 'afterEach' : 'afterEach' runs after every test cases after each 'it' function and 'after' only runs once.
})