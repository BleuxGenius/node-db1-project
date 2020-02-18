const express = require('express');
const accountsRouter = require('./router/accountRouter.js');
// database access using knex
// const db = require('./data/dbConfig.js');

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    res.send(`
    <h2> WEB DB CHALLENGE</h2>`)
});

server.use('/api/accounts', accountsRouter);



module.exports = server;

