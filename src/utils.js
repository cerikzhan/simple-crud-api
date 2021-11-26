function getRequestData(request) {
    return new Promise((resolve, reject) => {
        try {
            let data = '';
            request.on('data', (chunk) => {
                data += chunk.toString();
            });

            request.on('end', () => {
                resolve(data);
            });
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = { getRequestData };