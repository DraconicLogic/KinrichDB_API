const express = require('express');
const app = express();
const testRouter = require('./routes/test.js')

app.use('/test', testRouter)


module.exports = app