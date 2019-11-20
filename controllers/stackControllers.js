const db = require('../db/index.js')
const { formatDBContent } = require('../spec/util.js')

function addStack(req, res, next){
  const { recallid, content, date } = req.body
    
  const query = {
    name: 'add-stack',
    text: "INSERT INTO stacks VALUES ($1, $2, $3) RETURNING *",
    values: [recallid, content, date ]
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
      const formattedStacks = rows.map((stack) => {
        const {recallid, content} = stack
        const formattedContent = formatDBContent(content)
        const newStack = {
          recallid,
          content: formattedContent
        }
        return newStack
      })
      console.log('FORMATTED STACKS: ', formattedStacks)
      res.status(200).send(formattedStacks)
    })
    .catch((error) => console.error(error))
}

module.exports = {addStack, getStacks}