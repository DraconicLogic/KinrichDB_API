const admin = require('firebase-admin')
const { 
  DB_URL,
  PRIVATE_KEY,
  PROJECT_ID,
  CLIENT_EMAIL,
  NODE_ENV
} = process.env

// let newCreds = NODE_ENV === 'production' ? 
// {
//   projectId: PROJECT_ID,
//   privateKey: PRIVATE_KEY ? PRIVATE_KEY.replace(/\\n/g, '\n'): null,
//   clientEmail: CLIENT_EMAIL
// } : require('./nnenna-textiles-firebase-adminsdk-e6e1y-6201c988e2.json')
console.log('DB URL: ', DB_URL)

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: DB_URL
});

const db = admin.firestore()


module.exports = db