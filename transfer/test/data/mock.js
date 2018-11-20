const util = require('../../app/libs/utils');
class Mock {
    static getLogValidPayload() {
        return {
            merchant_id: '2',
            payment_reference: util.generateTransactionReference(),
            amount: 6000,
            currency: 566
        };
    }

    static getLogInValidPayload() {
        return {
            payment_reference: util.generateTransactionReference(),
            amount: 6000,
            currency: 566,
            channel: 'card'
        };
    }

    static getPayoutValidPayload() {
        return {
            from: '2018-11-15',
            to: '2018-11-30'
        };
    }
}

module.exports = Mock;