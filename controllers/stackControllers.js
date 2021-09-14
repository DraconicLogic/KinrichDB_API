const StackModel = require('../models/stackModels')


async function createStack(req, res, next){
  console.log("Before DB entry: ", req.body.newStack)
  const createdStack = await StackModel.create(req.body.newStack)
  console.log("After DB entry: ", createdStack)
  res.status(201).send({createdStack})
}

async function getStacks(req, res, next){
  const stacks = await StackModel.find({})
  res.status(200).send({stacks})
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

module.exports = {createStack, getStacks, removeStacksById}