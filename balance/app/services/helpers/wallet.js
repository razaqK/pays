const model = require('app/models/index');
const responseHelper = require('app/constants/response');
const status = require('app/constants/status');

class Wallet {

    async credit(merchantId, amount, currency, channel, paymentReference, transactionReference) {
        try {
            let history = await model.history.getByFields({
                merchant_id: merchantId,
                payment_reference: paymentReference,
                type: 'credit'
            });
            if (history) {
                return {status: false, data: responseHelper.exist()}
            }

            amount = Math.abs(amount)
            let wallet = await model.wallet.getByFields({merchant_id: merchantId, status: status.ENABLED});
            if (!wallet) {
                return {status: false, data: responseHelper.notExist()}
            }

            let res = await credit(wallet, amount);
            if (!res.status) {
                return res;
            }

            log(merchantId, amount, currency, channel, paymentReference, transactionReference, 'credit');

            return {status: true, data: null}
        } catch (e) {
            return {status: false, data: responseHelper.serverError()}
        }
    };


    async debit(merchantId, amount, currency, paymentReference, transactionReference, isPayout = false) {
        try {
            let history = await model.history.getByFields({
                merchant_id: merchantId,
                payment_reference: paymentReference,
                type: 'debit'
            });
            if (history) {
                return {status: false, data: responseHelper.exist()}
            }

            let creditHistory = await model.history.getByFields({
                merchant_id: merchantId,
                payment_reference: paymentReference,
                type: 'credit'
            });
            if (!creditHistory && !isPayout) {
                return {status: false, data: responseHelper.notExist()}
            }

            amount = Math.abs(amount)
            let wallet = await model.wallet.getByFields({merchant_id: merchantId, status: status.ENABLED});
            if (!wallet) {
                return {status: false, data: responseHelper.notExist()}
            }

            let res = await debit(wallet, amount);
            if (!res.status) {
                return res;
            }
            amount = -amount;

            const channel = isPayout ? 'transfer' : creditHistory.attributes.channel;

            log(merchantId, amount, currency, channel, paymentReference, transactionReference, 'debit');

            return {status: true, data: null}
        } catch (e) {
            return {status: false, data: responseHelper.serverError()}
        }
    }

}

const credit = async (wallet, amount) => {
    try {
        wallet.attributes.amount += amount;
        wallet.save({amount: wallet.attributes.amount}, {patch: true});
        wallet.refresh();
        return {status: true, data: wallet.attributes.amount}
    } catch (e) {
        return {status: false, data: responseHelper.serverError()}
    }
};

const debit = async (wallet, amount) => {
    try {
        wallet.attributes.amount -= amount;
        wallet.save({amount: wallet.attributes.amount}, {patch: true});
        wallet.refresh()
        return {status: true, data: wallet.attributes.amount}
    } catch (e) {
        return {status: false, data: responseHelper.serverError()}
    }
}

const log = async (merchantId, amount, currency, channel, paymentReference, transactionReference, type) => {
    return await model.history.forge({
        merchant_id: merchantId,
        amount: amount,
        currency: currency,
        channel: channel,
        payment_reference: paymentReference,
        transaction_reference: transactionReference,
        type: type
    }).save();
}

module.exports = new Wallet();
