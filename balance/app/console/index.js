const debit = require('app/console/debit')
const credit = require('app/console/credit')

module.exports = () => {
    debit();
    credit();
}