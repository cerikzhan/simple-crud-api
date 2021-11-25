const http = require('http');
const { Service } = require('./service');
const { getRequestData } = require('./utils');
const { CustomError } = require('./errors');

function main() {
    const server = http.createServer(async (req, res) => {
        let data;
        let personInfo;

        try {
            const service = new Service(req.url);

            switch (req.method) {
                case 'GET':
                    data = await service.get();
                    break;
                case 'POST':
                    personInfo = await getRequestData(req);
                    data = await service.post(JSON.parse(personInfo));
                    break;
                case 'PUT':
                    personInfo = await getRequestData(req);
                    data = await service.put(JSON.parse(personInfo));
                    break;
                case 'DELETE':
                    data = await service.delete();
                    break;
                default:
                    throw new CustomError(500, 'Not valid method');
            }

            res.writeHead(data.statusCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data.body));
        } catch(err) {
            res.writeHead(err.statusCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err.message }));
        }
    });


    const PORT = process.env.APP_PORT;
    const HOSTNAME = process.env.APP_HOSTNAME;

    server.listen(PORT, HOSTNAME, () => {
        console.log(`server started on: ${HOSTNAME}:${PORT}`);
    })
}

module.exports = { main };
