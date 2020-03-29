const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const containerSchema = new Schema({
  sealNumber: 'string',
  containerContent: [{
    stackContent: ['string'],
    stackId: 'string' 
  }],
  containerNumber: 'string',
  date: 'string'

})

module.exports = ContainerModel = mongoose.model('Container', containerSchema)