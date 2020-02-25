const db = require('../db/firebase.js')
const database = require('../db/mongodb.js')()
const { formatDBContent } = require('../spec/util.js')
const dbCollection = 'stacks'

function addStack(req, res, next){
  const { recallid, content, date } = req.body

  database.then((db) => {
    return db.collection(dbCollection)
      .insertOne(req.body)
  })
  .then((result) => {
    console.log('MongoDB data entered', result)
    res.status(201).send(req.body)
  })
  .catch(console.error)

  // const docRef = db.collection('stacks').doc(recallid);
  // docRef.set(req.body)
  // .then(() => {
  //   console.log('New stack added successfully')
  //   res.status(201).send(req.body)
  // })
  // . catch((error) => console.error(error))
}

async function getStacks(req, res, next){
  // const collectionRef =  db.collection('stacks')
  // collectionRef.get()
  //   .then((querySnapshot) => {
  //     const stacks = []
  //     querySnapshot.forEach((doc) => {
  //       const docData = doc.data()
  //       stacks.push(docData)
  //     })
  //     res.status(200).send(stacks)
  //   })
  //   .catch((error) => console.error(error))

  const cursor = await database.then((client) => {
    return client.database.collection('stacks').find()
  })
  .catch(console.error)
  
  const docs = await cursor.toArray()
  console.log(docs)

  
  res.status(200).send({docs})
 
  
    
}

function removeStacksByRecallid(req, res, next){
    const {usedCodes} = req.body
    const collectionRef = db.collection('stacks')
    usedCodes.forEach((recallid) => {
      collectionRef.doc(recallid).delete()
      .then(() => {
        console.log(`${recallid} deleted succesfully`)
      })
      .catch((error) => console.error(error))
    })
}

module.exports = {addStack, getStacks, removeStacksByRecallid}