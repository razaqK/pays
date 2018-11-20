const util = require('../../app/libs/utils');
class Mock {
    static getCreditValidPayload() {
        return {
            merchant_id: '2',
            payment_reference: util.generateTransactionReference(),
            amount: 6000,
            currency: 566,
            channel: 'card'
        };
    }

    static getCreditInValidPayload() {
        return {
            payment_reference: util.generateTransactionReference(),
            amount: 6000,
            currency: 566,
            channel: 'card'
        };
    }

    static getDebitValidPayload() {
        return {
            merchant_id: '2',
            payment_reference: util.generateTransactionReference(),
            amount: 1000,
            currency: 566
        };
    }

    static getDebitInValidPayload() {
        return {
            payment_reference: util.generateTransactionReference(),
            amount: 6000,
            currency: 566
        };
    }
}

module.exports = Mock;