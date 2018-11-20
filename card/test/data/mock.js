const util = require('../../app/libs/utils');
class Mock {
    static getInitiateValidPayload() {
        return {
            merchant_id: '2',
            payment_reference: util.generateTransactionReference(),
            amount: 6000,
            currency: 566,
            pan: '5310102010200990',
            pin: '1010'
        };
    }

    static getInitiateInValidPayload() {
        return {
            payment_reference: util.generateTransactionReference(),
            amount: 6000,
            currency: 566,
            channel: 'card'
        };
    }

    static getCompleteValidPayload() {
        return {
            merchant_id: '2',
            payment_reference: util.generateTransactionReference(),
            token: '1023'
        };
    }

    static getCompleteInValidPayload() {
        return {
            payment_reference: util.generateTransactionReference(),
            amount: 6000,
            currency: 566
        };
    }
}

module.exports = Mock;