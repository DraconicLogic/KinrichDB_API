const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const containerSchema = new Schema({
  containerNumber: 'string',
  sealNumber: 'string',
  date: 'string',
  containerContent: [{
    stackContent: ['string'],
    stackId: 'string' 
  }]
})

module.exports = ContainerModel = mongoose.model('Container', containerSchema)