const db = require('../db/index.js')
const {makeCurrentCodesJSON} = require('../recall_id_generator.js')

function addContainer(req, res, next){  
  const { containerNumber, sealNumber, content, date } = req.body

  const recallIds = content.map((stack) => {
    return stack.recallId ? stack.recallId : null
  })

  const formatedContent = content.map((stack) => {
    return stack.content
  })

  const queryOne = {
    name: "add-container",
    text: 'INSERT INTO containers VALUES ($1, $2, $3, $4) RETURNING *',
    values: [containerNumber, sealNumber, formatedContent, date]
  }

  db.query(queryOne)
    .then(({rows}) => {
      console.log('AFTER QUERY: ', rows)

      recallIds.forEach((id) => {
        
        const queryTwo = {
          name: "cleanup-stacks",
          text: `DELETE FROM stacks WHERE recallid = ${id}::text`
        }
        console.log('RECALL ID TYPE: ', typeof id)
        db.query(queryTwo)
          .catch((error) => console.error(error))

      })
      res.status(200).send(rows)

    })
    .catch((error) => console.error(error))
    .finally(() => makeCurrentCodesJSON())
}

module.exports = { addContainer }