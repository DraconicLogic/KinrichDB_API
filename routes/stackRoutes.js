const stackRouter = require('express').Router()
const {createStack, getStacks, removeStacksById} = require('../controllers/stackControllers.js')

stackRouter.route('/')
  .get(getStacks)
  .post(createStack)
  .delete(removeStacksById)

module.exports = stackRouter