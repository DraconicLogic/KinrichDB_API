function calculateLastEdited(stacks){
  return stacks.reduce((latest, currentStack) => {
    if (currentStack.date > latest.date) {
      latest = currentStack
      console.log("latest after reassignment: ", latest)
    }
    return latest
  })
}

module.exports = {calculateLastEdited}