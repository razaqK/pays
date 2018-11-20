exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('history', function (table) {
            table.increments('id').primary();
            table.decimal('amount', 10, 2);
            table.decimal('full_amount', 10, 2);
            table.string('payment_reference', 150).nullable();
            table.string('status', 50).nullable();
            table.string('merchant_id', 50).nullable();
            table.integer('transfer_id').unsigned().nullable().defaultTo(null).references('transfer.id');
            table.timestamp('created_at', true).defaultTo(knex.raw('now()')).notNullable();
            table.timestamp('updated_at', true).defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')).notNullable();
        })
    ])
};

exports.down = function (knex, Promise) {

};
