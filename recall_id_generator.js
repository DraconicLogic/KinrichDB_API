const db = require('./db/index.js')
const fs = require('fs')


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

function getUniqueCodes() {
  const query = 'SELECT RecallID FROM stacks'
  const curentCodes = db.query(query)
}

module.exports = {generateCode, generateUniqueCode}