let Joi = require('joi');
const validate = require('express-validation');
const sendResponse = require('app/libs/response_helper');
const response = require('app/constants/response');

module.exports = {
    transfer: {
        body: {
            merchant_id: Joi.string().required(),
            payment_reference: Joi.string().required(),
            amount: Joi.any().required(),
            currency: Joi.any().required()
        }
    },
    payout: {
        body: {
            from: Joi.string().required(),
            to: Joi.string().required()
        }
    },
    handleError: (err, req, res, next) => {
        if (err.errors) {
            let message = [];
            err.errors.forEach((error) => {
                message.push(error.messages)
            });
            message = message.join(', ').replace(/["]/g, '');

            if (err instanceof validate.ValidationError) {
                return sendResponse.sendError(req, res, response.badRequest(err, `${err.statusText}: ${message}`), 400);
            }
        }

        return sendResponse.sendError(req, res, response.serverError(err), 500);
    }
};
