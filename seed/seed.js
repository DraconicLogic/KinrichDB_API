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

module.exports = { seedDB }