exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('payment', function (table) {
            table.increments('id').primary();
            table.string('merchant_id').nullable();
            table.decimal('amount', 10, 2);
            table.string('payment_reference').nullable();
            table.string('transaction_reference').nullable();
            table.string('currency').nullable();
            table.string('status').nullable();
            table.timestamp('created_at', true).defaultTo(knex.raw('now()')).notNullable();
            table.timestamp('updated_at', true).defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')).notNullable();
        })
    ])
};

exports.down = function (knex, Promise) {

};
