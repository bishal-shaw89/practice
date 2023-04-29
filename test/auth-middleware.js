const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

const authMiddleware = require('../middleware/is-auth');

describe('Auth middleware', function () { // describe is used group the error message
    it('should throw an error if no authorization header is present', function () {
        const req = {
            get: function (params) {
                return null;
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw( // we bind so that it could run by chai
            'Not authenticated.' // It will throw an error if the message is also wrong. It should be the exact same message with all the same characters and each and everything
        )
    })

    it('should throw an error if the authorization header is only one string', function () {
        const req = {
            get: function (params) {
                return 'xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw() // if we are not passing any message in throw it will show the error message which was define in code.
    });

    it('should yield a userId after decoding the token', function () {
        const req = {
            get: function (params) {
                return 'Bearer xfgfdgfdgfdgfdsgfdyz';
            }
        };
        sinon.stub(jwt, 'verify');// pass two parameter 1st object and then the method.
        // jwt.verify = function () { // this function will over write the function return in 'is-auth' file to pass the test case.
        //     return { userId: 'abc' }
        // }
        jwt.verify.returns({ userId: 'abc' });// 'returns is pass by sinon'
        authMiddleware(req, {}, () => { }); // here we calling the authMiddleware with all parameters.
        expect(req).to.have.property('userId');// we expect the req should have a property name 'userId'.
        expect(jwt.verify.called).to.be.true;// check if the function is called or not and this called is passed by sinon
        jwt.verify.restore(); // this will restore the function.
    })

    // this test will pass as we are passing a string that can spilt with space, so after bearer it will treat the string as token
    it('should throw an error if the token cannot be verified', function () {
        const req = {
            get: function (params) {
                return 'Bearer xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw()
    })
})

