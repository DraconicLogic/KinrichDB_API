const { seedDB } = require("./seed.js")
const stacksData = require("./testData/stacks.json")


const result = seedDB(stacksData)
console.log('RESULT FROM SEED.ENV: ', result)