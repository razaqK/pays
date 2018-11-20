module.exports = {
    serverError: (error, message) => {
        return response(500, (message) ? message : 'Technical issue: We seem to be experiencing a problem with our server. Do you mind trying later?', error)
    },
    timeout: (error, message) => {
        return response(504, (message) ? message : 'Seems the request timeout.', error)
    },
    badRequest: (error, message) => {
        return response(400, (message) ? message : 'Bad Request - Seems the request is invalid.', error)
    },
    notFound: (error, message) => {
        return response(404, (message) ? message : 'No data was found for this request.', error)
    },
    forbidden: (error, message) => {
        return response(403, (message) ? message : 'Seems you don\'t have access to this resource.', error)
    },
    accessDenied: (error, message) => {
        return response(401, (message) ? message : 'Access denied - Seems your credentials are invalid.', error)
    },
    tokenExpired: (error, message) => {
        return response(401, (message) ? message : 'Access denied - Seems your token has expired. Kindly restart the process.', error)
    },
    exist: (error, message) => {
        return response(400, (message) ? message : 'Seems the info already exist', error)
    },
    notExist: (error, message) => {
        return response(400, (message) ? message : 'Seems the info doesn\'t exist', error)
    },
    disabled: (error, message) => {
        return response(400, (message) ? message : 'Seems the info has been disabled.', error)
    },
    invalidParam: (error, message) => {
        return response(400, (message) ? message : 'Seems the parameter provided is invalid.', error)
    },
    notAllowed: (error, message) => {
        return response(400, (message) ? message : 'Seems you are not allowed to perform this operation.', error)
    },
    notImplemented: (error, message) => {
        return response(400, (message) ? message : 'welcome to the treasure land.', error)
    },
};

let response = (code, message, error) => {
    return {
        message: message,
        code: code,
        error: error
    }
};