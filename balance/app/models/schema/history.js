'use strict';

const bookshelf = require('app/bookshelf');
let base = require('app/models/schema/base');

let history = bookshelf.Model.extend({
    idAttribute: 'id',
    tableName: 'history',
    hasTimeStamp: true
}, base);

module.exports = bookshelf.model('history', history);