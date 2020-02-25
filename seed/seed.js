const database = require('../db/mongodb.js')()




const seedDB = async (data) => {
  return database.then((client) => {
    client.database.dropDatabase()
    .then(() => {
      return client.database.collection('stacks').insertMany(data).then((result) =>{
        console.log(result)
      })
    })
    .catch(console.error)

  })
  .catch(console.error)
  

}

module.exports = { seedDB }