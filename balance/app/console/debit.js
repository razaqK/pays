const rabbitHelper = require('app/libs/rabbitmq_helper');
const service = require('app/services');
const util = require('app/libs/utils');

const process = async (msg) => {
    return await service.wallet.debit(msg.merchant_id, msg.amount, msg.currency, msg.payment_reference, util.generateTransactionReference(), true)
};

module.exports = () => {
    try {
        rabbitHelper.channel().then(channel => {
            rabbitHelper.consumeRPC(channel, 'debit_balance', process)
        })
    } catch (e) {
        console.log(e)
    }
}