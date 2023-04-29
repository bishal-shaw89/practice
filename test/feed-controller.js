const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const Post = require('../models/post');
const FeedController = require('../controllers/feed');

describe('Feed Controller', function () {

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

    it('should add a created post to the posts of the creator', function (done) { // if we add 'done' in argument mocha wants to find the done in the code

        const req = {
            body: {
                title: 'A post',
                content: 'Test post'
            },
            file: {
                path: 'abc'
            },
            userId: '644809062d2e13df9ba8acb2'
        };

        const res = {
            status: function () {
                return this;
            },
            json: function () { }
        };

        FeedController.createPost(req, res, () => { }).then(() => {
            expect(savedUser).to.have.property('posts');
            expect(savedUser.posts).to.have.length(1);
            done();
        });
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