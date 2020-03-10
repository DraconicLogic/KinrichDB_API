const { seedDB } = require("./seed.js")
const stacksData = require("./testData/stacks.json")




  seedDB(stacksData)
  .then((result) => {
    console.info('DATABASE SEEDED SUCCESSFULLY')
    return result
    
  })
  .catch(console.error)
  





  

