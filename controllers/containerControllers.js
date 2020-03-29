const ContainerModel = require('../models/containerModels')

async function addContainer(req, res, next){  
  const addedContainer = await ContainerModel.create(req.body.newContainer)
  res.status(201).send({addedContainer})
}

async function getContainers(req, res, next){
  const containers =  await ContainerModel.find({})
  res.status(200).send({containers})
}

async function getContainerBySeal(req,res, next){
  const {sealNumber} = req.params
  const [container] = await ContainerModel.find({sealNumber})
  res.status(200).send({container})
}

module.exports = { addContainer, getContainers, getContainerBySeal }