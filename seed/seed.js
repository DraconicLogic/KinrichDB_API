const db = require('../db/index.js')

const seedDB = ({stacks}) => {
  stacks.map((stack) => {

    const { recallId, content, date } = stack
    const query = {
      text: 'INSERT INTO stacks VALUES ($1, $2)',
      values: [recallId, content]
    }
    db.query(query, null, (response) => {
      console.log(response)
    })
  })
}

module.exports = { seedDB }