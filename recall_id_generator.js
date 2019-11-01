const fs = require('fs')
const db = require('./db/index.js')

function generateCode() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const newCode = {
    firstDigit: getRandomInt(10),
    secondDigit: getRandomInt(10),
    thirdDigit: getRandomInt(10)
  }
  const formatedCode = (`${newCode.firstDigit}${newCode.secondDigit}${newCode.thirdDigit}`)
  return formatedCode
}

function generateUniqueCode(currentCodes) {
  const codes = new Set(currentCodes);
  
  let uniqueCode = null;
  while (uniqueCode === null) {
    const newCode = generateCode()
    if (!codes.has(newCode)) {
      uniqueCode = newCode
    }
  }
  return uniqueCode
}

function getCodes() {
  const query = 'SELECT RecallID FROM stacks'
  return db.query(query)
  .then(({rows}) => {
    
    return rows
  })
}

async function makeCurrentCodesJSON() {
  const currentCodes  = await getCodes() 
 fs.writeFileSync('./current_codes.json', JSON.stringify(currentCodes, null, 2))
}

module.exports = {
  generateCode,
  generateUniqueCode,
  getCodes,
  makeCurrentCodesJSON
} 