const stackRouter = require('express').Router()
const {addStack, getStacks} = require('../controllers/stackControllers.js')


stackRouter.route('/')
  .get(getStacks)
  .post(addStack)


module.exports = stackRouter