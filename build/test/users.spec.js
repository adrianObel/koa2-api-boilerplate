import app from '../bin/server';
import supertest from 'supertest';
import { expect, should } from 'chai';
import { cleanDb } from './utils';
should();
var request = supertest.agent(app.listen());
var context = {};
describe('Users', function () {
    before(function (done) {
        cleanDb();
        done();
    });
    describe('POST /users', function () {
        it('should reject signup when data is incomplete', function (done) {
            request
                .post('/users')
                .set('Accept', 'application/json')
                .send({ username: 'supercoolname' })
                .expect(422, done);
        });
        it('should sign up', function (done) {
            request
                .post('/users')
                .set('Accept', 'application/json')
                .send({ user: { username: 'supercoolname', password: 'supersecretpassword' } })
                .expect(200, function (err, res) {
                if (err) {
                    return done(err);
                }
                res.body.user.should.have.property('username');
                res.body.user.username.should.equal('supercoolname');
                expect(res.body.user.password).to.not.exist;
                context.user = res.body.user;
                context.token = res.body.token;
                done();
            });
        });
    });
    describe('GET /users', function () {
        it('should not fetch users if the authorization header is missing', function (done) {
            request
                .get('/users')
                .set('Accept', 'application/json')
                .expect(401, done);
        });
        it('should not fetch users if the authorization header is missing the scheme', function (done) {
            request
                .get('/users')
                .set({
                Accept: 'application/json',
                Authorization: '1'
            })
                .expect(401, done);
        });
        it('should not fetch users if the authorization header has invalid scheme', function (done) {
            var token = context.token;
            request
                .get('/users')
                .set({
                Accept: 'application/json',
                Authorization: "Unknown " + token
            })
                .expect(401, done);
        });
        it('should not fetch users if token is invalid', function (done) {
            request
                .get('/users')
                .set({
                Accept: 'application/json',
                Authorization: 'Bearer 1'
            })
                .expect(401, done);
        });
        it('should fetch all users', function (done) {
            var token = context.token;
            request
                .get('/users')
                .set({
                Accept: 'application/json',
                Authorization: "Bearer " + token
            })
                .expect(200, function (err, res) {
                if (err) {
                    return done(err);
                }
                res.body.should.have.property('users');
                res.body.users.should.have.length(1);
                done();
            });
        });
    });
    describe('GET /users/:id', function () {
        it('should not fetch user if token is invalid', function (done) {
            request
                .get('/users/1')
                .set({
                Accept: 'application/json',
                Authorization: 'Bearer 1'
            })
                .expect(401, done);
        });
        it('should throw 404 if user doesn\'t exist', function (done) {
            var token = context.token;
            request
                .get('/users/1')
                .set({
                Accept: 'application/json',
                Authorization: "Bearer " + token
            })
                .expect(404, done);
        });
        it('should fetch user', function (done) {
            var _id = context.user._id, token = context.token;
            request
                .get("/users/" + _id)
                .set({
                Accept: 'application/json',
                Authorization: "Bearer " + token
            })
                .expect(200, function (err, res) {
                if (err) {
                    return done(err);
                }
                res.body.should.have.property('user');
                expect(res.body.user.password).to.not.exist;
                done();
            });
        });
    });
    describe('PUT /users/:id', function () {
        it('should not update user if token is invalid', function (done) {
            request
                .put('/users/1')
                .set({
                Accept: 'application/json',
                Authorization: 'Bearer 1'
            })
                .expect(401, done);
        });
        it('should throw 404 if user doesn\'t exist', function (done) {
            var token = context.token;
            request
                .put('/users/1')
                .set({
                Accept: 'application/json',
                Authorization: "Bearer " + token
            })
                .expect(404, done);
        });
        it('should update user', function (done) {
            var _id = context.user._id, token = context.token;
            request
                .put("/users/" + _id)
                .set({
                Accept: 'application/json',
                Authorization: "Bearer " + token
            })
                .send({ user: { username: 'updatedcoolname' } })
                .expect(200, function (err, res) {
                if (err) {
                    return done(err);
                }
                res.body.user.should.have.property('username');
                res.body.user.username.should.equal('updatedcoolname');
                expect(res.body.user.password).to.not.exist;
                done();
            });
        });
    });
    describe('DELETE /users/:id', function () {
        it('should not delete user if token is invalid', function (done) {
            request
                .delete('/users/1')
                .set({
                Accept: 'application/json',
                Authorization: 'Bearer 1'
            })
                .expect(401, done);
        });
        it('should throw 404 if user doesn\'t exist', function (done) {
            var token = context.token;
            request
                .delete('/users/1')
                .set({
                Accept: 'application/json',
                Authorization: "Bearer " + token
            })
                .expect(404, done);
        });
        it('should delete user', function (done) {
            var _id = context.user._id, token = context.token;
            request
                .delete("/users/" + _id)
                .set({
                Accept: 'application/json',
                Authorization: "Bearer " + token
            })
                .expect(200, done);
        });
    });
});
