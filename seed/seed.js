const mongoose = require('mongoose')
const StackModel = require('../models/stackModels')
const ContainerModel = require('../models/containerModels')

const seedDB = async ({stackData,  containerData}) => {
  const dbDropped = 
  await mongoose.connection.dropDatabase()

  let addedStacks;
  let addedContainers;

  if (dbDropped) {
    addedStacks = 
    await StackModel.insertMany(stackData)
    addedContainers =
    await ContainerModel.insertMany(containerData)
  }

  return {addedStacks, addedContainers}
}

module.exports = { seedDB }