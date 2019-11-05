const apiRouter = require('express').Router()
const stacksRouter = require('./stackRoutes.js')


apiRouter.use('/stacks', stacksRouter)



module.exports =  apiRouter 