const testRouter = require('express').Router()
const { testDbConnection} = require('../controllers/test.js')

testRouter.get('/', testDbConnection)

module.exports = testRouter
  