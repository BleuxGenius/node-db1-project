const express = require('express');

// database access using knex
// const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

const accountsRouter = require('./accountRouter.js');
server.use('/api/accounts', accountsRouter);

server.get("/", (req, res) => {
    res.send(`
    <h2> WEB DB CHALLENGE</h2>`)
});

module.exports = server;

