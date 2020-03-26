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
    console.log('REMOVING STACKS')
    const {usedCodes} = req.body
    console.log(req.body)
    console.log(usedCodes)
  
  const removedStack = await StackModel.deleteOne({stackId:usedCodes[0]})

  console.log(removedStack)
  res.status(200).send({removedStack})
}

module.exports = {addStack, getStacks, removeStacksById}