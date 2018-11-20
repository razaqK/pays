const wallet = require('app/routes/src/wallet');

module.exports = (app) => {
    app.use('/v1/balance', wallet);
}