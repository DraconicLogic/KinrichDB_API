const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
  code: 'string',
  item: 'string',
  baleSize: 'string',
  price: Number,
  units: 'string',
  size: Number
})

module.exports = ProductModel = mongoose.model('Product', productSchema)