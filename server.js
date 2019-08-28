const express = require('express');

const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./authentication/authRouter');

const server = express();
server.use(helmet());
server.use(logger);
server.use(express.json());

server.use('/api', authRouter);

function logger(req, res, next) {
  const time = new Date();
  console.log(`${req.method} to ${req.path} at ${time.toISOString()}`);
  next();
}

module.exports = server;
