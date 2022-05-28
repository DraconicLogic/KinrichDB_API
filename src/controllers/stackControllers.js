const StackModel = require('../models/stackModels')
const {calculateLastEdited} = require('../utils/lastEdited.js')
const {removePlaceholders} = require('../utils/formatStacks')

async function createStack(req, res, next){
  const { newStack } = req.body
  StackModel.create(newStack)
  .then((createdStack) => {
    res.status(201).send({createdStack})
  })
  .catch((error) => {
    console.error("Create Stack Promise Rejection: ", error)
    next(error)
  }) 
}

async function getStacks(req, res, next){
  StackModel.find({})
  .then((stackCollection) => {
    const lastEdited = calculateLastEdited(stackCollection).date
    const stacks = removePlaceholders(stackCollection)
    res.status(200).send({stacks, lastEdited})
  })
  .catch((error) => {
    console.error("Get Stack Promise Rejection: ", error)
    next(error)
  })
}

async function overwriteStacks(req, res, next){
  const { newStacks } = req.body
  console.log("Overwriting Stacks: ", newStacks)
  StackModel.collection.drop()
  .then(() => {
    return StackModel.insertMany(newStacks)
  })
  .then((createdStacks) => {
    res.status(201).send({createdStacks})
  })
  .catch((error) => {
    console.error("overwriteStacks has errored: ", error)
    next(error)
  })

}

async function removeStacksById(req, res, next){
  const {usedCodes} = req.body 
  let deleteReport
  if (usedCodes.length === 1) {
    deleteReport = 
    await StackModel.deleteOne({stackId:usedCodes[0]})
  }
  if (usedCodes.length > 1) {
    deleteReport = 
    await StackModel.deleteMany({
      stackId: {
        $in: usedCodes
      }
    })
  }
  res.status(200).send({deleteReport, deletedIds: usedCodes})
}

module.exports = {createStack, getStacks, removeStacksById, overwriteStacks}
