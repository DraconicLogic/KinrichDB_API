const admin = require('firebase-admin')
const { 
  DB_URL,
  PRIVATE_KEY,
  PROJECT_ID,
  CLIENT_EMAIL,
  NODE_ENV
} = process.env

let newCreds = {
  projectId: PROJECT_ID,
  privateKey: PRIVATE_KEY ? PRIVATE_KEY.replace(/\\n/g, '\n'): null,
  clientEmail: CLIENT_EMAIL
}
if (NODE_ENV !== 'production') {
  newCreds = require('./nnenna-textiles-firebase-adminsdk-e6e1y-6201c988e2.json')
}


admin.initializeApp({
  credential: admin.credential.cert(newCreds),
  databaseURL: DB_URL
});

const db = admin.firestore()


module.exports = db