'use strict'

const server = require('../app');
const request = require('supertest')(server.listen());
const expect = require('chai').expect;
const Mock = require('./data/mock');

describe('[POST] /initiate  Initiate card payment request', function () {
    this.timeout(15000);
    it('It should return an error', function () {
        return request.post('/v1/payment/initiate')
            .send(Mock.getInitiateInValidPayload())
            .set('Content-Type', 'application/json')
            .expect(400)
            .then(res => {
                expect(res.body.status).to.eql('error');
            })
    });
});

describe('[POST] /initiate  Initiate card payment request', function () {
    this.timeout(15000);
    it('It should return a success', function () {
        return request.post('/v1/payment/initiate')
            .send(Mock.getInitiateValidPayload())
            .set('Content-Type', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.keys(['status', 'data']);
                expect(res.body.status).to.eql('success');
            })
    });
});

describe('[POST] /complete  Complete card payment request', function () {
    this.timeout(15000);
    it('It should return a success', function () {
        return request.post('/v1/payment/complete')
            .send(Mock.getCompleteValidPayload())
            .set('Content-Type', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.keys(['status', 'data']);
                expect(res.body.status).to.eql('success');
            })
    });
});

describe('[POST] /complete  Complete card payment request', function () {
    this.timeout(15000);
    it('It should return an error', function () {
        return request.post('/v1/payment/complete')
            .send(Mock.getCompleteInValidPayload())
            .set('Content-Type', 'application/json')
            .expect(400)
            .then(res => {
                expect(res.body.status).to.eql('error');
            })
    });
});