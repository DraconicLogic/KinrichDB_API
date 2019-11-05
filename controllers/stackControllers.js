const currentCodes = require('../currentCodes.json')
const {generateUniqueCode} = require('../recall_id_generator.js')

function addStackToDB(req, res, next){
  console.log('ADDING STACK TO THE DATABASE')
  console.log('REQUES5 OBJECT: ', req)
}

module.exports = {addStackToDB}