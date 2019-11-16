const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const testRouter = require('./routes/test.js')
const apiRouter = require('./routes/api.js')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(logger)
app.use('/test', testRouter)
app.use('/api', apiRouter)

function logger(req, res, next){
  console.log('REQUEST RECIEVED')
  console.log(req.body)
  next()
}


module.exports = app