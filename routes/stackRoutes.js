const stackRouter = require('express').Router()
const {addStack, getStacks, removeStacksById} = require('../controllers/stackControllers.js')


stackRouter.route('/')
  .get(getStacks)
  .post(addStack)
  .delete(removeStacksById)


module.exports = stackRouter