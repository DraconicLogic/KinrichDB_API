const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const stackSchema = new Schema({
  stackid: 'string',
  content: ['string'],
  date: 'string'
})

module.exports = StackModel = mongoose.model('Stack', stackSchema)