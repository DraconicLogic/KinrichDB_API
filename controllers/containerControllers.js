const db = require('../db/index.js')

function addContainer(req, res, next){  
  const { containerNumber, sealNumber, containerContent, date } = req.body

  const query = {
    name: "add-container",
    text: 'INSERT INTO containers VALUES ($1, $2, $3, $4) RETURNING *',
    values: [containerNumber, sealNumber, containerContent, date]
  }

  db.query(query)
    .then(({rows}) => {
      console.log('AFTER QUERY: ', rows)
      res.status(201).send(rows[0])

    })
    .catch((error) => console.error(error))
    
}

function getContainers(req, res, next){
  const query = {
    name: "get-containers",
    text: "SELECT * FROM containers"
  }

  db.query(query)
    .then(({rows}) => {
      console.log('AFTER QUERY: ', rows)
      res.status(200).send(rows)
    })
    .catch((error) => console.error(error))
}

module.exports = { addContainer, getContainers }