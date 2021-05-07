const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const stackSchema = new Schema({
  stackId: 'string',
  content: ['string'],
  date: {type: Date, default: Date.now}
})

module.exports = StackModel = mongoose.model('Stack', stackSchema)