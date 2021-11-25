const http = require('http');
const { Service } = require('./service');
const { urlValidator } = require('./url-validator');
const { getRequestData } = require('./utils');

function main() {
    const server = http.createServer(async (req, res) => {
        let url;
        let data;
        let statusCode = 200;

        try {
            url = urlValidator(req.url);
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Page not found' }));
        }

        const service = new Service(url);

        switch (req.method) {
            case 'GET':
                data = await service.get();
                break;
            case 'POST':
                const person = await getRequestData(req);
                data = await service.post(JSON.parse(person));
                break;
            case 'PUT':
                data = await service.put();
                break;
            case 'DELETE':
                data = service.delete();
                break;
        }

        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(data);
    });


    const PORT = process.env.APP_PORT;
    const HOSTNAME = process.env.APP_HOSTNAME;

    server.listen(PORT, HOSTNAME, () => {
        console.log(`server started on port: ${PORT}`);
    })
}

module.exports = { main };
