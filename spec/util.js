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

module.exports = { fillValidCodes }