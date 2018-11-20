let knex = require('app/config/database');
let bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
bookshelf.plugin('visibility');
bookshelf.plugin(require('bookshelf-soft-delete'));

module.exports = bookshelf;