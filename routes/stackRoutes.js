const stackRouter = require('express').Router()
const {addStackToDB} = require('../controllers/stackControllers')


stackRouter.route('/')
  .post(addStackToDB)


module.exports = stackRouter