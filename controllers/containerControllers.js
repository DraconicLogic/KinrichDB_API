const db = require('../db/index.js')

function addContainer(req, res, next){  
  const { containerNumber, sealNumber, containerContent, date, usedCodes } = req.body



  const queryOne = {
    name: "add-container",
    text: 'INSERT INTO containers VALUES ($1, $2, $3, $4) RETURNING *',
    values: [containerNumber, sealNumber, containerContent, date]
  }

  db.query(queryOne)
    .then(({rows}) => {
      console.log('AFTER QUERY: ', rows)

      usedCodes.forEach((id) => {
        
        const queryTwo = {
          name: "cleanup-stacks",
          text: `DELETE FROM stacks WHERE recallid = ${id}::text`
        }
        console.log('RECALL ID TYPE: ', typeof id)
        db.query(queryTwo)
          .catch((error) => console.error(error))

      })
      res.status(200).send(rows[0])

    })
    .catch((error) => console.error(error))
    
}

module.exports = { addContainer }