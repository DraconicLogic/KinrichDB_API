const db = require('../db/index.js')
const { makeCurrentCodesJSON } = require('../recall_id_generator.js')

const seedDB = (stacks) => {
  return db.query("DELETE FROM stacks")
  .then(() => {
    return stacks.map((stack) => {
      const { recallId, content, date } = stack
      console.log('RECALL ID TYPE DURING SEEDING: ', typeof recallId)
      const query = {
        text: 'INSERT INTO stacks VALUES ($1, $2, $3) RETURNING *',
        values: [recallId, content, date]
      }
      db.query(query)
      .then((result) => {
      makeCurrentCodesJSON()
      console.info('SEEDING COMPLETED')
      return result
      })
    })
  })
  .catch((error) => console.error('OUTER CATCH', error))
}

module.exports = { seedDB }