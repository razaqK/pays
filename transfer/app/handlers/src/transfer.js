const service = require('app/services');

class Transfer {

    async log(req) {
        try {
            let response = await service.transfer.log(req.body.merchant_id, req.body.amount, req.body.currency, req.body.payment_reference);
            if (!response.status) {
                return Promise.reject(response.data)
            }
            return Promise.resolve(response.data)
        } catch (e) {
            return Promise.reject(e.data)
        }
    };

    async payout(req) {
        try {
            let response = await service.transfer.payout(req.body.from, req.body.to);
            if (!response.status) {
                return Promise.reject(response.data)
            }
            return Promise.resolve(response.data)
        } catch (e) {
            return Promise.reject(e.data)
        }
    };

}

module.exports = new Transfer();
