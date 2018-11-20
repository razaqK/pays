'use strict';

const bookshelf = require('app/bookshelf');
let base = require('app/models/schema/base');

let transfer = bookshelf.Model.extend({
    idAttribute: 'id',
    tableName: 'transfer',
    hasTimeStamp: true
}, base);

module.exports = bookshelf.model('transfer', transfer);