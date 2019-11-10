const apiRouter = require('express').Router()
const stacksRouter = require('./stackRoutes.js')
const containerRouter = require('./containerRoutes.js')


apiRouter.use('/stacks', stacksRouter)
apiRouter.use('/containers', containerRouter)



module.exports =  apiRouter 