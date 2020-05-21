const ContainerModel = require('../models/containerModels')
const {createFile, email} = require('../email')

async function createContainer(req, res, next){ 
  const {newContainer} = req.body 
  const createdContainer = await ContainerModel.create(req.body.newContainer)

  if (process.env.NODE_ENV !== 'test') {
    email(createFile(newContainer), newContainer)
  }

  res.status(201).send({createdContainer})
}

async function getContainers(req, res, next){
  const containers =  await ContainerModel.find({})
  res.status(200).send({containers})
}

async function getContainerBySeal(req,res, next){
  const {sealNumber} = req.params
  const [container] = await ContainerModel.find({sealNumber})
  res.status(200).send({[sealNumber]: container})
}

module.exports = { createContainer, getContainers, getContainerBySeal }