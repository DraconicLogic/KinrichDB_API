const mongoose = require('mongoose')
const StackModel = require('../../src/models/stackModels')
const ContainerModel = require('../../src/models/containerModels')


const seedDB = async ({stackData,  containerData}) => {
  const dbDropped = 
  await mongoose.connection.dropDatabase()

  let createdStacks;
  let createdContainers;

  if (dbDropped) {
    createdStacks = 
    await StackModel.insertMany(stackData)
    createdContainers =
    await ContainerModel.insertMany(containerData)
  }

  return {createdStacks, createdContainers}
}

module.exports = { seedDB }