const datefns = require('date-fns');

export const formatUtils = {
    formatDate: (date) => {
        return datefns.format(date, 'DD/MM/YYYY');
    },
    formatDateTime: (date) => {
        return datefns.format(date, 'HH:mm');
    },
};
