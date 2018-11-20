const rabbitHelper = require('app/libs/rabbitmq_helper');
const service = require('app/services');

const process = async (msg) => {
    let response = await service.transfer.log(msg.merchant_id, msg.amount, msg.currency, msg.payment_reference)
    return response.status
};

module.exports = () => {
    try {
        rabbitHelper.channel().then(channel => {
            rabbitHelper.consumeRPC(channel, 'log_transfer', process)
        })
    } catch (e) {
        console.log(e)
    }
}