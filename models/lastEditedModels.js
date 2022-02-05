const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const lastEditedSchema = new Schema({
  type: "string",
  date: {type: Date}
})

module.exports = LastEditedModel = mongoose.model('LastEdited', lastEditedSchema)