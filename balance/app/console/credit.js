const rabbitHelper = require('app/libs/rabbitmq_helper');
const service = require('app/services');
const util = require('app/libs/utils');

const process = async (msg) => {
    return await service.wallet.credit(msg.merchant_id, msg.amount, msg.currency, msg.channel, msg.payment_reference, util.generateTransactionReference())
};

module.exports = () => {
    try {
        rabbitHelper.channel().then(channel => {
            rabbitHelper.consumeRPC(channel, 'credit_balance', process)
        })
    } catch (e) {
        console.log(e)
    }
}