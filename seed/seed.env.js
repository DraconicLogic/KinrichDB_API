require('custom-env').env()
const mongoose = require('mongoose')
const { DB_HOST, DB_NAME } = process.env
const { seedDB } = require("./seed.js")
const stacksData = require("./testData/stacks.json")


mongoose.connect(`${DB_HOST}${DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log(`Ready to seed ${DB_NAME}`)
  seedDB(stacksData)
    .then((result) => {
      console.info('DATABASE SEEDED SUCCESSFULLY', result)
      
      return result
      
    })

})
.catch(console.error)
// .finally(() => {
//   mongoose.disconnect(() => console.log('Closing DB connection'))


// })

  





  

