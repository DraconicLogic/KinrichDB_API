require('custom-env').env()
const { DB_URI, DB_NAME } = process.env
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const apiRouter = require('./routes/api.js')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const { createCSV } = require('./csv')
const { sendEmail } = require('./email/index.js')
  
mongoose.connect(`${DB_URI}`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log(`Successfully connected to ${DB_NAME}`)
}) 
.catch(console.error)

app.use(cors())
app.use(bodyParser.json())
app.use(createCSV)
app.use(sendEmail)
app.get('/', (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/welcome.html`))
})

app.get('/api',(req, res, next) => {
  res.sendFile(path.join(`${__dirname}/resourses.html`))
})
app.use('/api', apiRouter)

module.exports = app