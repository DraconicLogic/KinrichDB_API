const database = require('../db/mongodb.js')()




const seedDB = async (data) => {
  
  return database.then(async (client) => {
    const dbDropped = await client.database.dropDatabase()
    if (dbDropped) {
      console.log('Dropping Database')
      return client.database.collection('stacks')
    }
  })
  .then(async (stackCollections) => {

    const docs = await stackCollections.find()
    console.log(await docs.toArray())
    return stackCollections.insertMany(data)
  })  
  .then((result) =>{
    console.log(result)
    return result
  })
  .catch(console.error)
  

}

module.exports = { seedDB }