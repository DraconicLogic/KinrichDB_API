const stackRouter = require('express').Router()
const {addStack, getStacks, removeStacksByRecallid} = require('../controllers/stackControllers.js')


stackRouter.route('/')
  .get(getStacks)
  .post(addStack)
  .delete(removeStacksByRecallid)


module.exports = stackRouter