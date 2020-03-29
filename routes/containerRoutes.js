const containerRouter = require('express').Router()
const {addContainer, getContainers, getContainerBySeal} = require('../controllers/containerControllers.js')

containerRouter.route('/')
  .get(getContainers)
  .post(addContainer)

containerRouter.route('/:sealNumber')
  .get(getContainerBySeal)

module.exports = containerRouter