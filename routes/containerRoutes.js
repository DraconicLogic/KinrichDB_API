const containerRouter = require('express').Router()
const {
  createContainer, 
  getContainers, 
  getContainerBySeal,
  getContainerByContainerNumber
} = require('../controllers/containerControllers.js')

containerRouter.route('/')
  .get(getContainers)
  .post(createContainer)

containerRouter.route('/seal-num/:sealNumber')
  .get(getContainerBySeal)

containerRouter.route('/box-num/:containerNumber')
  .get(getContainerByContainerNumber)

module.exports = containerRouter