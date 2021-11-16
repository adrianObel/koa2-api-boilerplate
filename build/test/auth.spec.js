import app from '../bin/server';
import supertest from 'supertest';
import { expect, should } from 'chai';
import { cleanDb, authUser } from './utils';
should();
var request = supertest.agent(app.listen());
var context = {};
describe('Auth', function () {
    before(function (done) {
        cleanDb();
        authUser(request, function (err, _a) {
            var user = _a.user, token = _a.token;
            if (err) {
                return done(err);
            }
            context.user = user;
            context.token = token;
            done();
        });
    });
    describe('POST /auth', function () {
        it('should throw 401 if credentials are incorrect', function (done) {
            request
                .post('/auth')
                .set('Accept', 'application/json')
                .send({ username: 'supercoolname', password: 'wrongpassword' })
                .expect(401, done);
        });
        it('should auth user', function (done) {
            request
                .post('/auth')
                .set('Accept', 'application/json')
                .send({ username: 'test', password: 'pass' })
                .expect(200, function (err, res) {
                if (err) {
                    return done(err);
                }
                res.body.user.should.have.property('username');
                res.body.user.username.should.equal('test');
                expect(res.body.user.password).to.not.exist;
                context.user = res.body.user;
                context.token = res.body.token;
                done();
            });
        });
    });
});
