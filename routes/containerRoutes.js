const containerRouter = require('express').Router()
const {addContainer, getContainers} = require('../controllers/containerControllers.js')

containerRouter.route('/')
  .get(getContainers)
  .post(addContainer)

module.exports = containerRouter