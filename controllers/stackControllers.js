const db = require('../db/firebase.js')
const database = require('../db/mongodb.js')()
const { formatDBContent } = require('../spec/util.js')
const dbCollection = 'stacks'

async function addStack(req, res, next){
  console.log('ADDING STACK')
  const { recallid, content, date } = req.body
  const cursor = await database.then((client) => {
    return client.database.collection('stacks').insertOne(req.body)
  })
  .catch(console.error)
  console.log(Object.keys(cursor.ops))

  // const doc = await cursor.result()
  // res.status(201).send({doc})

}

async function getStacks(req, res, next){
  const cursor = await database.then((client) => {
    return client.database.collection('stacks').find()
  })
  .catch(console.error)
  const docs = await cursor.toArray()
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