require('custom-env').env()
const mongoose = require('mongoose')
const { DB_HOST, DB_NAME } = process.env
const { seedDB } = require("./seed.js")
const stackData = require("./testData/stacks.json")
const containerData = require("./testData/containers.json")
const lastEditedData = require("./testData/lastEdited.json")

mongoose.connect(`${DB_HOST}${DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log(`Ready to seed ${DB_NAME}`)
  return seedDB({stackData, containerData, lastEditedData})
    .then((result) => {
      console.log("After seeding Database: ", result)
      console.log('Database seeded succesfully')
      return result 
    })
})
.catch(console.error)
.finally(() => {
  mongoose.disconnect(() => console.log('Closing DB connection'))
})

  





  

