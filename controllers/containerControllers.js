const db = require('../db/firebase.js')

function addContainer(req, res, next){  
  const { containerNumber, sealNumber, containerContent, date } = req.body
  
  const docRef = db.collection('containers').doc(sealNumber)
  docRef.set(req.body)
  .then(() => {
    
    res.status(201).send(req.body)
  })
  .catch((error) => console.error(error))  
}

function getContainers(req, res, next){
  const collectionRef = db.collection('containers')
  collectionRef.get()
  .then((querySnapshot) => {
    const containers = []
    querySnapshot.forEach((doc) => {
      const docData = doc.data()
      containers.push(docData)
    })
    res.status(200).send(containers)
  })
  .catch((error) => console.error(error))
}

module.exports = { addContainer, getContainers }