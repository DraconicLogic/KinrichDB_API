const db = require('../db/index.js')

function addContainer(req, res, next){
  console.log('ADDING CONTAINER')
  
  const { containerNumber, sealNumber, content } = req.body

  const recallIds = content.map((stack) => {
    return stack.recallId
  })
  console.log('ARRAY OF RECALL IDS: ', recallIds)

  const formatedContent = content.map((stack) => {
  
    console.log('STACK WHILE FORMATTING: ', stack)
    return stack.content
  })
  console.log('FORMATTED CONTENT: ', formatedContent)

  const queryOne = {
    name: "add-container",
    text: 'INSERT INTO containers VALUES ($1, $2, $3) RETURNING *',
    values: [containerNumber, sealNumber, formatedContent]
  }

  db.query(queryOne)
    .then(({rows}) => {
      console.log('AFTER QUERY: ', rows)
      recallIds.forEach((id) => {
        const queryTwo = {
          name: "cleanup-stacks",
          text: `DELETE FROM stacks WHERE recallid=${id}`
        }
        console.log(id)
        db.query(queryTwo)
          .catch((error) => console.error(error))

      })
      res.status(200).send(rows)
    })
    .catch((error) => console.error(error))

}

module.exports = { addContainer }