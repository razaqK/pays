'use strict';

const bookshelf = require('app/bookshelf');
let base = require('app/models/schema/base');

let payment = bookshelf.Model.extend({
    idAttribute: 'id',
    tableName: 'payment',
    hasTimeStamp: true
}, base);

module.exports = bookshelf.model('payment', payment);