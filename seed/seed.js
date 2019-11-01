const db = require('../db/index.js')

const seedDB = (stacks) => {
  db.query("DELETE FROM stacks RETURNING *")
  .then((result) => {
    
    console.log('DELETE stacks records: ', result)
    return stacks.map((stack) => {
      const { recallId, content, date } = stack
      const query = {
        text: 'INSERT INTO stacks VALUES ($1, $2) RETURNING *',
        values: [recallId, content]
      }
      db.query(query)
      .then((result) => {
      console.log('SEEDING SUCCESFUL?: ', result)
      return result
      })
    })
  })
  .catch((error) => console.error('OUTER CATCH', error))
}

module.exports = { seedDB }