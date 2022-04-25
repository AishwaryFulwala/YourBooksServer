require('dotenv').config();

const http = require('http');

const app = require('./app');
const { mongoConnect } = require('./services/mongo');

const server = http.createServer(app);
const port = process.env.PORT;

async function startServer() {
    await mongoConnect();

    server.listen(port, () => {
        console.log(port);
    })
}

startServer();