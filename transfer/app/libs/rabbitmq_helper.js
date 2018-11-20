const amqp = require('amqplib');
const config = require('app/config/config');
const util = require('app/libs/utils');

class Rabbit {

    async channel() {
        const conn = await amqp.connect(`amqp://${config.rabbitmq.uri}`);
        return await conn.createChannel();
    }

    // rpc
    async publishRPC(ex, payload, process) {
        try {
            payload = typeof payload === 'object' ? JSON.stringify(payload) : payload;
            const conn = await amqp.connect(`amqp://${config.rabbitmq.uri}`);
            const ch = await conn.createChannel();
            const q = await ch.assertQueue('', {exclusive: false});
            const corr = util.generateUuid();
            console.log(' [x] Requesting %s', payload);

            ch.consume(q.queue, function (msg) {
                if (msg.properties.correlationId == corr) {
                    let message = msg.content.toString();
                    message = getMessage(message);
                    payload = getMessage(payload)

                    process(message, payload)
                }
            }, {noAck: true});

            ch.sendToQueue(ex,
                new Buffer(payload),
                {correlationId: corr, replyTo: q.queue});

        } catch (e) {
            console.log(e)
        }
    }

    // rpc
    async consumeRPC(channel, ex, process) {
        try {
            channel.assertQueue(ex, {durable: true});
            channel.prefetch(1);

            console.log(' [x] Awaiting RPC requests');

            channel.consume(ex, function reply(msg) {
                let message = msg.content.toString();
                message = getMessage(message);

                process(message).then(res => {
                    channel.sendToQueue(msg.properties.replyTo,
                        new Buffer(JSON.stringify(res)),
                        {correlationId: msg.properties.correlationId});

                    channel.ack(msg);
                }).catch(err => {
                    console.log(err)
                });

            });
            return true;
        } catch (e) {
            console.log(e)
            return false;
        }
    }
}

const getMessage = (message) => {
    try {
        return JSON.parse(message);
    }
    catch (error) {
        return message;
    }
}

module.exports = new Rabbit();