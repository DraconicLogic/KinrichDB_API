const mongoose = require('mongoose')
const StackModel = require('../models/stackModels')
const ContainerModel = require('../models/containerModels')
const LastEditedModel = require('../models/lastEditedModels')

const seedDB = async ({stackData,  containerData, lastEditedData}) => {
  const dbDropped = 
  await mongoose.connection.dropDatabase()

  let createdStacks;
  let createdContainers;
  let createdLastEdited

  if (dbDropped) {
    createdStacks = 
    await StackModel.insertMany(stackData)
    createdContainers =
    await ContainerModel.insertMany(containerData)
    createdLastEdited = 
    await LastEditedModel.insertMany(lastEditedData)
  }

  return {createdStacks, createdContainers, createdLastEdited}
}

module.exports = { seedDB }