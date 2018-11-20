'use strict';

const bookshelf = require('app/bookshelf');
let base = require('app/models/schema/base');

let wallet = bookshelf.Model.extend({
    idAttribute: 'id',
    tableName: 'wallet',
    hasTimeStamp: true
}, base);

module.exports = bookshelf.model('wallet', wallet);