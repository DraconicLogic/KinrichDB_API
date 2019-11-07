const stackRouter = require('express').Router()
const {addStackToDB, getStacks} = require('../controllers/stackControllers')


stackRouter.route('/')
  .get(getStacks)
  .post(addStackToDB)


module.exports = stackRouter