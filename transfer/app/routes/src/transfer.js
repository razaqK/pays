const express = require('express');
const validate = require('express-validation');
const router = express.Router();
const controller = require('app/controllers/index');
const validator = require('app/libs/validator');

router.post('/log', [validate(validator.transfer)], controller.transfer.log);
router.post('/payout', [validate(validator.payout)], controller.transfer.payout);
router.use(validator.handleError);

module.exports = router;