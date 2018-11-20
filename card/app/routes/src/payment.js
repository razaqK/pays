const express = require('express');
const validate = require('express-validation');
const router = express.Router();
const controller = require('app/controllers/index');
const auth = require('app/middleware/auth');
const validator = require('app/libs/validator');

router.post('/initiate', [validate(validator.initiate)], controller.payment.initiate);
router.post('/complete', [validate(validator.complete)], controller.payment.complete);
router.use(validator.handleError);

module.exports = router;