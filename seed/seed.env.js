const { seedDB } = require("./seed.js")
const stacksData = require("./testData/stacks.json")




  seedDB(stacksData)
  .then((result) => {
    console.log(result)
  })
  .catch(console.error)
  





  

