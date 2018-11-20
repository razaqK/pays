const service = require('app/services');

class Payment {

    async initiate(req) {
        try {
            let response = await service.payment.initiateRequest(req.body.merchant_id, req.body.amount, req.body.currency, req.body.payment_reference, req.body.pan, req.body.pin, req.body.customer);
            if (!response.status) {
                return Promise.reject(response.data)
            }
            return Promise.resolve(response.data)
        } catch (e) {
            return Promise.reject(e.data)
        }
    };

    async complete(req) {
        try {
            let response = await service.payment.completeRequest(req.body.merchant_id, req.body.token, req.body.payment_reference);
            if (!response.status) {
                return Promise.reject(response.data)
            }
            return Promise.resolve(response.data)
        } catch (e) {
            return Promise.reject(e.data)
        }
    };

}

module.exports = new Payment();
