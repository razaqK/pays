const model = require('app/models/index');
const responseHelper = require('app/constants/response');
const status = require('app/constants/status');
const constant = require('app/constants/constant');
const util = require('app/libs/utils');
const rabbit = require('app/libs/rabbitmq_helper');

class Payment {

    async initiateRequest(merchantId, amount, currency, paymentReference, pan, pin, customer) {
        try {
            amount = Math.abs(amount)
            let payment = await model.payment.getByFields({payment_reference: paymentReference, merchant_id: merchantId});
            if (payment && (payment.attributes.status !== status.PENDING || payment.attributes.amount !== amount)) {
                return {status: false, data: responseHelper.notAllowed()};
            }

            if (!payment) {
                payment = await logPayment(amount, merchantId, paymentReference, currency)
            }

            let payload = {
                pan: pan,
                pin: pin,
                customer: customer,
                currency: currency
            }

            let log = await logRequest(payment, status.PENDING, constant.INITIATE, payload)

            // ToDo make a request to card process
            // log the response status
            /*let response = await processorInitiate(payload);
            if (!response.status || response.data.status !== status.SUCCESS) {
                log.save({status: status.ERROR, response: JSON.stringify(response.data)}, {patch: true})
                payment.save({status: status.FAILED}, {patch: true})
                return {status: false, data: responseHelper.invalidParam(response.data, response.data.message)};
            }
            log.save({status: status.SUCCESS, response: JSON.stringify(response.data)}, {patch: true})
            */
            log.save({status: status.SUCCESS, response: null}, {patch: true})
            payment.save({transaction_reference: util.generateTransactionReference()}, {patch: true})

            return {status: true, data: null}
        } catch (e) {
            return {status: false, data: responseHelper.serverError()}
        }
    };


    async completeRequest(merchantId, token, paymentReference) {
        try {
            let payment = await model.payment.getByFields({payment_reference: paymentReference, merchant_id: merchantId});
            if (!payment || (payment && payment.attributes.status !== status.PENDING)) {
                return {status: false, data: responseHelper.notAllowed()};
            }

            let payload = {
                token: token,
                transaction_reference: payment.attributes.transaction_reference
            }

            let log = await logRequest(payment, status.PENDING, constant.COMPLETE, payload)

            // ToDo make a request to card process
            // log the response status
            /*let response = await processorComplete(payload);
            if (!response.status || response.data.status !== status.SUCCESS) {
                log.save({status: status.ERROR, response: JSON.stringify(response.data)}, {patch: true})
                payment.save({status: status.FAILED}, {patch: true})
                return {status: false, data: responseHelper.invalidParam(response.data, response.data.message)};
            }
            log.save({status: status.SUCCESS, response: JSON.stringify(response.data)}, {patch: true})
            */
            log.save({status: status.SUCCESS, response: null}, {patch: true})
            payment.save({status: status.SUCCESS}, {patch: true})
            // fire credit event to balance and log to transfer
            rabbit.publishRPC('credit_balance', {
                merchant_id: merchantId,
                payment_reference: paymentReference,
                amount: payment.attributes.amount,
                currency: payment.attributes.currency,
                channel: 'card'
            }, processCredit);


            rabbit.publishRPC('log_transfer', {
                merchant_id: merchantId,
                payment_reference: paymentReference,
                amount: payment.attributes.amount,
                currency: payment.attributes.currency
            }, processLog);

            return {status: true, data: true}
        } catch (e) {
            return {status: false, data: responseHelper.serverError()}
        }
    }

    // ToDO requery and hook
}

const logRequest = async (payment, state, type, payload, response) => {
    return await model.log.forge().save({
        payment_id: payment.id,
        amount: payment.attributes.amount,
        status: state,
        request_type: type,
        request: JSON.stringify(payload),
        response: response ? JSON.stringify(response) : null
    });
}

const logPayment = async (amount, merchantId, paymentRef, currency) => {
    return await model.payment.forge().save({
        amount: amount,
        merchant_id: merchantId,
        payment_reference: paymentRef,
        currency: currency,
        status: status.PENDING
    });
}

const processLog = async (msg) => {
    console.log(msg)
};

const processCredit = async (msg) => {
    console.log(msg)
};

module.exports = new Payment();
