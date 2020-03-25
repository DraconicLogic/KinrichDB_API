
const StackModel = require('../models/stackModels')


async function addStack(req, res, next){
  // console.log('ADDING STACK')
  // const { recallid, content, date } = req.body
  // const cursor = await database.then((client) => {
  //   return client.database.collection('stacks').insertOne(req.body)
  // })
  // .catch(console.error)
  // console.log(Object.keys(cursor.ops))

  // const doc = await cursor.result()
  // res.status(201).send({doc})

}

async function getStacks(req, res, next){
  const stacks = await StackModel.find({})
  res.status(200).send({stacks})
}

function removeStacksById(req, res, next){
    console.log('REMOVING STACKS')
    const {usedCodes} = req.body
    console.log(usedCodes)
   
}

module.exports = {addStack, getStacks, removeStacksById}