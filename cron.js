const cron = require('node-cron')
const { makeCurrentCodesJSON } = require('./recall_id_generator')

cron.schedule('0 8 * * 1-5', () => {
  console.log("RUNNING THE CRON")
  makeCurrentCodesJSON();
})
