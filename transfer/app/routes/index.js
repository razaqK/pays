const transfer = require('app/routes/src/transfer');

module.exports = (app) => {
    app.use('/v1/transfer', transfer);
}