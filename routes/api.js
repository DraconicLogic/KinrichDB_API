const apiRouter = require('express').Router()
const stacksRouter = require('./stackRoutes.js')
const containerRouter = require('./containerRoutes.js')
const productRouter = require('./productRoutes')

apiRouter.use('/stacks', stacksRouter)
apiRouter.use('/containers', containerRouter)
apiRouter.use('/products', productRouter)

module.exports =  apiRouter 