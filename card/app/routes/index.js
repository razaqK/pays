const payment = require('app/routes/src/payment');

module.exports = (app) => {
    app.use('/v1/payment', payment);
}