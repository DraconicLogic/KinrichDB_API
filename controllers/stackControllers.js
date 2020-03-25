
const StackModel = require('../models/stackModels')


async function addStack(req, res, next){
  const addedStack = await StackModel.create(req.body)
  res.status(201).send({addedStack})
}

async function getStacks(req, res, next){
  const stacks = await StackModel.find({})
  res.status(200).send({stacks})
}

function removeStacksById(req, res, next){
    console.log('REMOVING STACKS')
    const {usedCodes} = req.body
    console.log(usedCodes)
   
}

module.exports = {addStack, getStacks, removeStacksById}