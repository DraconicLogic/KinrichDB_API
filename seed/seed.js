const mongoose = require('mongoose')
const StackModel = require('../models/stackModels')

const seedDB = async (stacksData) => {
  const dbDropped = 
  await mongoose.connection.dropDatabase()

  let addedStacks; 

  if (dbDropped) {
    addedStacks = 
    await StackModel.insertMany(stacksData)
  }

  return addedStacks
}


const oldSeedDB = async (data) => {

  
  return database.then(async (client) => {
    const dbDropped = await client.database.dropDatabase()
    if (dbDropped) {
      console.log('Dropping Database')
      return client.database.collection('stacks')
    }
  })
  .then(async (stackCollections) => {

    const docs = await stackCollections.find()
    console.log(await docs.toArray())
    return stackCollections.insertMany(data)
  })  
  .then((result) =>{
    console.log(result)
    return result
  })
  .catch(console.error)
  

}

module.exports = { seedDB }