function urlValidator(url) {
    const arr = url.split('/').slice(1);

    if (arr.length === 1 && arr[0] === 'person') {
        return arr;
    }

    if (arr.length === 2 && arr[0] === 'person' && arr[1].match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
        return arr;
    }

    throw new Error('Not valid url');
}

module.exports = { urlValidator };
