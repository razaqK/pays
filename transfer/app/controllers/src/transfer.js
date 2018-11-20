const handler = require('app/handlers/index');
const sendResponse = require('app/libs/response_helper');

class Transfer {
    log(req, res) {
        handler.transfer.log(req).then(response => {
            return sendResponse.sendSuccess(req, res, response, 200);
        }).catch(error => {
            return sendResponse.sendError(req, res, error, error.code);
        })
    };

    payout(req, res) {
        handler.transfer.payout(req).then(response => {
            return sendResponse.sendSuccess(req, res, response, 200);
        }).catch(error => {
            return sendResponse.sendError(req, res, error, error.code);
        })
    };
}

module.exports = new Transfer();