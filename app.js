require('custom-env').env()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const apiRouter = require('./routes/api.js')
const cors = require('cors')






// const client = new MongoClient(uri, {useNewUrlParser: true})
// client.connect((err) => {
//   const db = client.db('ntl-api_test')
//   db.collection('stacks').insertOne({
//     content: ["UW", "CHKNW", "MIX TRA", "LDD", "LDS","LTSH","CR", "CJS", "CJS", "CANO", "LCD", "LND"],
//     date: "11-2-2020",
//     recallid: "123"
//   })
//   .then((result) => {
//     console.log(result)
//     console.log("Added stack to database")
//     client.close()
//   })
// })

app.use(cors())
app.use(bodyParser.json())
app.use(logger)
// app.get('/', (req, res) => res.sendFile('./endpoints.md'))
app.use('/api', apiRouter)

function logger(req, res, next){
  console.log('REQUEST RECIEVED')
  console.log(req.body)
  next()
}


module.exports = app