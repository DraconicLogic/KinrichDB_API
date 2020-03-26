const StackModel = require('../models/stackModels')


async function addStack(req, res, next){
  const addedStack = await StackModel.create(req.body)
  res.status(201).send({addedStack})
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
  res.status(200).send({deleteReport})
}

module.exports = {addStack, getStacks, removeStacksById}