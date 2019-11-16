const currentCodes = require('../currentCodes.json')
const { generateUniqueCode, makeCurrentCodesJSON} = require('../recall_id_generator.js')
const db = require('../db/index.js')
const { formatDBContent } = require('../spec/util.js')

function addStack(req, res, next){
  const { content, date } = req.body
  const uniqueID = generateUniqueCode(currentCodes)
  console.log(uniqueID)
  
  const query = {
    name: 'add-stack',
    text: "INSERT INTO stacks VALUES ($1, $2, $3) RETURNING *",
    values: [uniqueID, content, date ]
  }

  db.query(query)
    .then(({rows}) => {
      console.log('AFTER QUERY: ', rows)
      const stack = rows[0]
      const formattedContent = formatDBContent(stack.content)
      const newStack = {
        recallid: stack.recallid,
        content: formattedContent,
        date: stack.date
      }
      makeCurrentCodesJSON()
      res.status(201).send(newStack)
    })
    .catch((error) => console.error(error))
}

function getStacks(req, res, next){
  const query = {
    name: 'get-stacks',
    text: 'SELECT * FROM stacks'
  }

  db.query(query)
    .then(({rows}) => {
      console.log('AFTER QUERY: ', rows)
      res.status(200).send(rows)
    })
    .catch((error) => console.error(error))
}

module.exports = {addStack, getStacks}