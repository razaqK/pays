const express = require('express');
const validate = require('express-validation');
const router = express.Router();
const controller = require('app/controllers/index');
const auth = require('app/middleware/auth');
const validator = require('app/libs/validator');

router.post('/credit', [validate(validator.balance)], controller.wallet.credit);
router.post('/debit', [validate(validator.balance)], controller.wallet.debit);
router.use(validator.handleError);

module.exports = router;