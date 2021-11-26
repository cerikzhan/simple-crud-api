const { CustomError } = require('./errors');

function urlValidator(url) {
    const arr = url.split('/').filter((str) => !!str);

    if (arr.length === 1 && arr[0] === 'person') {
        return arr;
    }

    if (arr.length === 2 && arr[0] === 'person') {
        const correctUUID = arr[1]?.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        if (correctUUID) {
            return arr;
        }
        throw new CustomError(400, 'Not valid personId');
    }

    throw new CustomError(404, 'Not valid url');
}

module.exports = { urlValidator };
