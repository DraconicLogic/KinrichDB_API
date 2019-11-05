const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const testRouter = require('./routes/test.js')
const apiRouter = require('./routes/api.js')

app.use(bodyParser.json())
app.use('/test', testRouter)
app.use('/api', apiRouter)

module.exports = app