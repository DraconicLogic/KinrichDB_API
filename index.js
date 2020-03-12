const app = require('./app.js')

const port = process.env.PORT || '4000'


app.listen(port, () => console.log(`Server Listening on Port ${port}`))