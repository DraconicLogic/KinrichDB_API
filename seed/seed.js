const database = require('../db/mongodb.js')()




const seedDB = async (data) => {
  
  return database.then(async (client) => {
    const dbDropped = await client.database.dropDatabase()
    console.log(dbDropped)
    const collections = await client.database.listCollections()
    console.log(collections)
    if (dbDropped ) {
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