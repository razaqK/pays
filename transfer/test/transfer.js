'use strict'

const server = require('../app');
const request = require('supertest')(server.listen());
const expect = require('chai').expect;
const Mock = require('./data/mock');

describe('[POST] /transfer/log  Initiate log transfer', function () {
    this.timeout(15000);
    it('It should return an error', function () {
        return request.post('/v1/transfer/log')
            .send(Mock.getLogInValidPayload())
            .set('Content-Type', 'application/json')
            .expect(400)
            .then(res => {
                expect(res.body.status).to.eql('error');
            })
    });
});

describe('[POST] /transfer/log  Initiate log transfer', function () {
    this.timeout(15000);
    it('It should return a success', function () {
        return request.post('/v1/transfer/log')
            .send(Mock.getLogValidPayload())
            .set('Content-Type', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.keys(['status', 'data']);
                expect(res.body.status).to.eql('success');
            })
    });
});

describe('[POST] /transfer/payout  Payout request', function () {
    this.timeout(15000);
    it('It should return a success', function () {
        return request.post('/v1/transfer/payout')
            .send(Mock.getPayoutValidPayload())
            .set('Content-Type', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.keys(['status', 'data']);
                expect(res.body.status).to.eql('success');
            })
    });
});