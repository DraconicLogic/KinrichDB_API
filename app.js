const express = require('express');
const app = express();
const testRouter = require('./routes/test.js')
const apiRouter = require('./routes/api.js')


app.use('/test', testRouter)
app.use('/api', apiRouter)

module.exports = app