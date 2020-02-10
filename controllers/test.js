// DELETE THIS FILE
const db = require('../db/index.js')


const testDbConnection = (req, res, next) => {
  console.log('REACHED THE TEST CONTROLLER')
  const query = 'SELECT CURRENT_DATABASE'
  db.query(query, null, (dbName) => {
    console.log('RETURNED DATA',dbName)
  })
}

module.exports = { testDbConnection }