const fs = require('fs')
const { getCodes } = require('./recall_id_generator.js')

async function makeCurrentCodesJSON() {
   const currentCodes  = await getCodes()
  console.log(currentCodes)
  
  fs.writeFileSync('./current_codes.json', JSON.stringify(currentCodes, null, 2))
}

makeCurrentCodesJSON()