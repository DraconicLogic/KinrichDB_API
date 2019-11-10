const containerRouter = require('express').Router()
const {addContainer} = require('../controllers/containerControllers.js')

containerRouter.route('/')
  .post(addContainer)

module.exports = containerRouter