const currentCodes = require('../currentCodes.json')
const { generateUniqueCode, makeCurrentCodesJSON} = require('../recall_id_generator.js')
const db = require('../db/index.js')

function addStackToDB(req, res, next){
  const { content } = req.body
  const uniqueID = generateUniqueCode(currentCodes)
  console.log(uniqueID)
  
  const query = {
    name: 'add-stack',
    text: "INSERT INTO stacks VALUES ($1, $2) RETURNING *",
    values: [uniqueID, content ]
  }

  db.query(query)
    .then(({rows}) => {
      console.log('AFTER QUERY: ', rows)
      makeCurrentCodesJSON()
      res.status(201).send(rows[0])
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

module.exports = {addStackToDB, getStacks}