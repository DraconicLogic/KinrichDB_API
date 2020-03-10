const { DB_URL, CREDS } = process.env

const admin = require('firebase-admin')


admin.initializeApp({
  credential: admin.credential.cert(CREDS),
  databaseURL: DB_URL
});

const db = admin.firestore()


module.exports = db