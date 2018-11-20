const config = require('app/config/config');

const sendResponse = require('app/libs/response_helper');
const response = require('app/constants/response');
const consumer = require('app/console')

const {Tracer, BatchRecorder, jsonEncoder: {JSON_V2}} = require('zipkin');
const CLSContext = require('zipkin-context-cls');
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
const { HttpLogger } = require('zipkin-transport-http');

const ctxImpl = new CLSContext('zipkin');
const recorder = new BatchRecorder({
    logger: new HttpLogger({
        endpoint: `http://zipkin:9411/api/v2/spans`,
        jsonEncoder: JSON_V2
    })
});
const localServiceName = 'balance'; // name of this application
const tracer = new Tracer({ctxImpl, recorder, localServiceName});


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(zipkinMiddleware({tracer}));
const route = require('app/routes/index');
const cors = require('cors');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

route(app);

app.use('/', function (req, res) {
    let data = response.notImplemented();
    data.status_code = data.code;
    return sendResponse.sendSuccess(req, res, data, 200)
});

process.on('unhandledRejection', (err) => {
    console.log(err)
});

let server = app;

if(!module.parent){
    server = app.listen(config.server.port, () => {
        console.log(`Listening on port ${config.server.port}`)
    });

    consumer();
}

module.exports = server