const stackRouter = require('express').Router()
const {createStack, getStacks, removeStacksById, overwriteStacks} = require('../controllers/stackControllers.js')
const cors = require('cors')

stackRouter.route('/')
  .get(getStacks)
  .post(cors(), createStack)
  .delete(removeStacksById)
  .put(overwriteStacks)

module.exports = stackRouter