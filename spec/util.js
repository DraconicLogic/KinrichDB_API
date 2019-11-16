// this function creates an array of all valid 3 digit codes from 001 - 999 except the code passed as a parameter
function fillValidCodes(excempt){
  let num = 0
  const codes = []
  while (num < 1000) {
    let tempNum = num.toString();
    if (tempNum.length === 1) {
      tempNum = '00' + tempNum
    }
    if (tempNum.length === 2) {
      tempNum = '0' + tempNum
    }
    if (tempNum !== excempt){
      codes.push(tempNum)
    }
    num++
  }
  return codes
}

function formatDBContent(string){
  const newContent = string
  .slice(1, (string.length - 1) )
  .split(',')
  .map((entry) => {
    return entry.slice(1, (entry.length - 1))
  })
  return newContent
}

module.exports = { fillValidCodes, formatDBContent }