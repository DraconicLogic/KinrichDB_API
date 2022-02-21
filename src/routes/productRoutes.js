const productRouter = require('express').Router()
const {getProducts} = require('../controllers/productControllers.js')

productRouter.route('/')
  .get(getProducts)

module.exports = productRouter