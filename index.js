const app = require('./app.js')
const port = process.env.PORT || '3000'
// require('./cron')

app.listen(port, () => console.log(`Server Listening on Port ${port}`))