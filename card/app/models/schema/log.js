'use strict';

const bookshelf = require('app/bookshelf');
let base = require('app/models/schema/base');

let log = bookshelf.Model.extend({
    idAttribute: 'id',
    tableName: 'logs',
    hasTimeStamp: true
}, base);

module.exports = bookshelf.model('logs', log);