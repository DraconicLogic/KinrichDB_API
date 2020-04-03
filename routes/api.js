const apiRouter = require('express').Router()
const stacksRouter = require('./stackRoutes.js')
const containerRouter = require('./containerRoutes.js')
const path = require('path')


apiRouter.use('/stacks', stacksRouter)
apiRouter.use('/containers', containerRouter)




module.exports =  apiRouter 