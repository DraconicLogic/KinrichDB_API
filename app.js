require('custom-env').env()
const process = require("process")
const { DB_URI, DB_NAME } = process.env
const express = require('express');
const app = express();
const apiRouter = require('./routes/api.js')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const {preflightHandler} = require('./utils/preflightHandler')
const error = require("./utils/Error")
  
mongoose.connect(`${DB_URI}`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log(`Successfully connected to ${DB_NAME}`)
}) 
.catch(console.error)

app.use(express.json())
app.use(cors())
app.use(preflightHandler)

app.get('/', (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/welcome.html`))
})

app.get('/api',(req, res, next) => {
  res.sendFile(path.join(`${__dirname}/resourses.html`))
})
app.use('/api', apiRouter)

app.use(error.notFound)

process.on("exit", (code) => {
  mongoose.disconnect()
  .then(() => {
    console.log(`Connection to ${DB_NAME} closed`)
    console.log(`Exiting app in code ${code}`)
  })
})


module.exports = app
