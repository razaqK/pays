const handler = require('app/handlers/index');
const sendResponse = require('app/libs/response_helper');

class Payment {
    initiate(req, res) {
        handler.payment.initiate(req).then(response => {
            return sendResponse.sendSuccess(req, res, response, 200);
        }).catch(error => {
            return sendResponse.sendError(req, res, error, error.code);
        })
    };

    complete(req, res) {
        handler.payment.complete(req).then(response => {
            return sendResponse.sendSuccess(req, res, response, 200);
        }).catch(error => {
            return sendResponse.sendError(req, res, error, error.code);
        })
    };
}

module.exports = new Payment();