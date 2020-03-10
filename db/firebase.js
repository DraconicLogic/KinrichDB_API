const admin = require('firebase-admin')
const { DB_URL, CREDS } = process.env
let newCreds = CREDS
if (!CREDS) {
  newCreds = require('./nnenna-textiles-firebase-adminsdk-e6e1y-6201c988e2.json')
}


admin.initializeApp({
  credential: admin.credential.cert(newCreds),
  databaseURL: DB_URL
});

const db = admin.firestore()


module.exports = db