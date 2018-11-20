const service = require('app/services');
const util = require('app/libs/utils')

class Wallet {

    async credit(req) {
        try {
            const txnRef = util.generateTransactionReference();
            let response = await service.wallet.credit(req.body.merchant_id, req.body.amount, req.body.currency, req.body.channel, req.body.payment_reference, txnRef);
            if (!response.status) {
                return Promise.reject(response.data)
            }
            return Promise.resolve(response.data)
        } catch (e) {
            return Promise.reject(e.data)
        }
    };


    async debit(req) {
        try {
            const txnRef = util.generateTransactionReference();
            let response = await service.wallet.debit(req.body.merchant_id, req.body.amount, req.body.currency, req.body.payment_reference, txnRef);
            if (!response.status) {
                return Promise.reject(response.data)
            }
            return Promise.resolve(response.data)
        } catch (e) {
            return Promise.reject(e.data)
        }
    }

}

module.exports = new Wallet();
