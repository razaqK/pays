exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('transfer', function (table) {
            table.increments('id').primary();
            table.string('merchant_id').nullable();
            table.string('reference').nullable();
            table.date('transaction_date').nullable();
            table.decimal('amount', 10, 2);
            table.decimal('full_amount', 10, 2);
            table.string('status').defaultTo('pending');
            table.string('currency');
            table.timestamp('created_at', true).defaultTo(knex.raw('now()')).notNullable();
            table.timestamp('updated_at', true).defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')).notNullable();
        })
    ])
};

exports.down = function (knex, Promise) {

};
