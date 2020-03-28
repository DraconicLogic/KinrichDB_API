const ContainerModel = require('../models/containerModels')

async function addContainer(req, res, next){  
 
}

async function getContainers(req, res, next){
  const containers =  await ContainerModel.find({})
  res.status(200).send({containers})
}

async function getContainerById(req,res, next){}

module.exports = { addContainer, getContainers, getContainerById }