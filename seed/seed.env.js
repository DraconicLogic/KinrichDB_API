const { seedDB } = require("./seed.js")
const stacksData = require("./testData/stacks.json")
const MongoClient = require("mongodb").MongoClient;

const uri = 'mongodb://localhost:27017'

const client = new MongoClient(uri, {useNewParser: true})
client.connect((err) => {
  
  seedDB(stacksData)
  
})




  

