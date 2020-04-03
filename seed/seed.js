const mongoose = require('mongoose')
const StackModel = require('../models/stackModels')
const ContainerModel = require('../models/containerModels')

const seedDB = async ({stackData,  containerData}) => {
  const dbDropped = 
  await mongoose.connection.dropDatabase()

  let createdStacks;
  let addedContainers;

  if (dbDropped) {
    createdStacks = 
    await StackModel.insertMany(stackData)
    addedContainers =
    await ContainerModel.insertMany(containerData)
  }

  return {createdStacks, addedContainers}
}

module.exports = { seedDB }