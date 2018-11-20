module.exports = {
    generateTransactionReference: () => {
        const date = new Date(),
            dformat = [date.getFullYear(),
                date.getMonth(),
                date.getDay(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds()
            ].join('');
        return `PS${dformat}`
    },
    generateUuid: () => {
        return Math.random().toString() +
            Math.random().toString() +
            Math.random().toString();
    }
};