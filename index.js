const app = require('./app.js')
const port = process.env.PORT || '3000'
// Cronjob forces nodemon to constantly reset
require('./cron.js')

app.listen(port, () => console.log(`Server Listening on Port ${port}`))