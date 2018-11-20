const status = require('app/constants/status');

module.exports = {
    sendSuccess: function (req, res, data, status_code, message) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.method === "OPTIONS") {
            return res.status(200).end();
        }

        return res.status(status_code).json({
            status: status.SUCCESS,
            data: data && data.length > 0 ? data : [],
            message: message
        });
    },
    sendError: function (req, res, error, status_code) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        status_code = status_code ? status_code : 500;
        if (req.method === "OPTIONS") {
            return res.status(status_code).end();
        }

        return res.status(status_code).json({
            status: status.ERROR,
            message: error.message,
            code: error.code,
            error: error.error
        });
    }
};