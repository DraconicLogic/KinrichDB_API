const stackRouter = require('express').Router()
const {createStack, getStacks, removeStacksById} = require('../controllers/stackControllers.js')
const cors = require('cors')

stackRouter.route('/')
  .get(getStacks)
  .post(cors(), createStack)
  .delete(removeStacksById)

module.exports = stackRouter