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
    sanitize: (type, value) => {
        switch (type) {
            case 'string':
                value = value && typeof(value) === 'string' && value.trim().length > 0
                    &&  value.indexOf('\'') < 0 && value.indexOf('"') < 0 ? value.trim() : null;
                break;
            case 'boolean':
                value = typeof(value) == 'boolean' && value == true ? true : false;
                break;
            case 'array':
                value = value && typeof(value) == 'object' && value instanceof Array ? value : [];
                break;
            case 'number':
                value = typeof(value) === 'number' && value % 1 === 0 ? value : null;
                break;
            case 'object':
                value = value && typeof(value) == 'object' && value !== null ? value : {};
                break;
        }
        return value;
    },
    generateUuid: () => {
        return Math.random().toString() +
            Math.random().toString() +
            Math.random().toString();
    }
};