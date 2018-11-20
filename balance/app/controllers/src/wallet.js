const handler = require('app/handlers/index');
const sendResponse = require('app/libs/response_helper');

class Wallet {
    credit(req, res) {
        handler.wallet.credit(req).then(response => {
            return sendResponse.sendSuccess(req, res, response, 200);
        }).catch(error => {
            return sendResponse.sendError(req, res, error, error.code);
        })
    };


    debit(req, res) {
        handler.wallet.debit(req).then(response => {
            return sendResponse.sendSuccess(req, res, response, 200);
        }).catch(error => {
            return sendResponse.sendError(req, res, error, error.code);
        })
    };

}

module.exports = new Wallet();