const rabbit = require('../libs/rabbitmq_helper')

const process = async (msg) => {
    console.log(msg)
};
rabbit.publishRPC('log_transfer', {
    merchant_id: 2,
    payment_reference: 12344,
    amount: 400,
    currency: 566,
    channel: 'card'
}, process);
