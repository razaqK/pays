const model = require('app/models/index');
const responseHelper = require('app/constants/response');
const status = require('app/constants/status');
const util = require('app/libs/utils');
const rabbit = require('app/libs/rabbitmq_helper');

class Transfer {

    async log(merchantId, amount, currency, paymentReference) {
        try {
            let log = await model.history.getByFields({
                merchant_id: merchantId,
                payment_reference: paymentReference
            });
            if (log) {
                return {status: false, data: responseHelper.exist()}
            }

            amount = Math.abs(amount)

            let transfer = await logTransfer(amount, merchantId, currency);
            if (!transfer) {
                return {status: false, data: responseHelper.serverError()};
            }

            logHistory(amount, transfer, paymentReference);

            return {status: true, data: null}
        } catch (e) {
            return {status: false, data: responseHelper.serverError()}
        }
    };


    async payout(from, to) {
        try {
            let transfer = await model.transfer.getAllByRawSql(['amount', 'merchant_id', 'transaction_date', 'reference'], `status = '${status.PENDING}' AND date(transaction_date) BETWEEN '${from}' AND '${to}'`);
            if (!transfer) {
                return {status: false, data: responseHelper.notExist()}
            }

            for (let txn of transfer.toJSON()) {
                // ToDO send transfer request to bank on success mark transfer as success and to_bank as 1
                // fire event to debit merchant balance if success mark as 1 else 0
                rabbit.publishRPC('debit_balance', {
                    merchant_id: txn.merchant_id,
                    payment_reference: txn.reference,
                    amount: txn.amount,
                    currency: txn.currency
                }, processDebit);

            }

            return {status: true, data: null}
        } catch (e) {
            return {status: false, data: responseHelper.serverError()}
        }
    }

}

const logTransfer = async (amount, merchantId, currency) => {
    let date = new Date().toISOString().split('T')[0];
    let transfer = await model.transfer.getByFields({
        status: status.PENDING,
        merchant_id: merchantId,
        transaction_date: date
    });

    if (!transfer) {
        const reference = util.generateTransactionReference();
        transfer = await model.transfer.forge().save({
            merchant_id: merchantId,
            transaction_date: date,
            amount: amount,
            full_amount: amount,
            reference: reference,
            currency: currency
        });
        return transfer;
    }

    let fullAmt = amount;
    fullAmt += transfer.attributes.full_amount;
    amount += transfer.attributes.amount;
    transfer.save({
        full_amount: fullAmt,
        amount: amount
    }, {patch: true});
    return transfer;
};

const logHistory = async (amount, transfer, paymentRef) => {
    return await model.history.forge().save({
        transfer_id: transfer.id,
        full_amount: amount,
        amount: amount,
        status: status.SUCCESS,
        payment_reference: paymentRef,
        merchant_id: transfer.attributes.merchant_id
    });
}

const processDebit = async (msg, payload) => {
    let trn = await model.transfer.getByFields({merchant_id: payload.merchant_id, reference: payload.payment_reference});
    if (!trn) {
        return;
    }

    const state = msg.status ? status.SUCCESS : status.FAILED;
    trn.save({status: state}, {patch: true})
};

module.exports = new Transfer();
