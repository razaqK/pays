exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('logs', function (table) {
            table.increments('id').primary();
            table.decimal('amount', 10, 2);
            table.string('reference').nullable();
            table.string('request_type').nullable();
            table.longtext('request').nullable();
            table.longtext('response').nullable();
            table.string('status').nullable();
            table.integer('payment_id').unsigned().nullable().defaultTo(null).references('payment.id');
            table.timestamp('created_at', true).defaultTo(knex.raw('now()')).notNullable();
            table.timestamp('updated_at', true).defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')).notNullable();
        })
    ])
};

exports.down = function (knex, Promise) {

};
