'use strict'

const server = require('../app');
const request = require('supertest')(server.listen());
const expect = require('chai').expect;
const Mock = require('./data/mock');

describe('[POST] /credit  Credit wallet', function () {
    this.timeout(15000);
    it('It should return an error', function () {
        return request.post('/v1/balance/credit')
            .send(Mock.getCreditInValidPayload())
            .set('Content-Type', 'application/json')
            .expect(400)
            .then(res => {
                expect(res.body.status).to.eql('error');
            })
    });
});

describe('[POST] /credit  Credit wallet', function () {
    this.timeout(15000);
    it('It should return a success', function () {
        return request.post('/v1/balance/credit')
            .send(Mock.getCreditValidPayload())
            .set('Content-Type', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.keys(['status', 'data']);
                expect(res.body.status).to.eql('success');
            })
    });
});

describe('[POST] /debit  Debit wallet', function () {
    this.timeout(15000);
    it('It should return a success', function () {
        return request.post('/v1/balance/debit')
            .send(Mock.getDebitValidPayload())
            .set('Content-Type', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.keys(['status', 'data']);
                expect(res.body.status).to.eql('success');
            })
    });
});

describe('[POST] /debit  Debit wallet', function () {
    this.timeout(15000);
    it('It should return an error', function () {
        return request.post('/v1/balance/debit')
            .send(Mock.getDebitInValidPayload())
            .set('Content-Type', 'application/json')
            .expect(400)
            .then(res => {
                expect(res.body.status).to.eql('error');
            })
    });
});