const containerRouter = require('express').Router()
const {createContainer, getContainers, getContainerBySeal} = require('../controllers/containerControllers.js')

containerRouter.route('/')
  .get(getContainers)
  .post(createContainer)

containerRouter.route('/:sealNumber')
  .get(getContainerBySeal)

module.exports = containerRouter