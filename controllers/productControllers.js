const productModel = require('../models/productModels')
const products = require('../products.json')

async function createProduct(req, res, next) {

}

function getProducts(req, res, next){
  res.status(200).send({products})
} 

module.exports = {getProducts}