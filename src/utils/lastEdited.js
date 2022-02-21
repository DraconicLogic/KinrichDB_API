function calculateLastEdited(stacks){
  return stacks.reduce((latest, currentStack) => {
    if (currentStack.date > latest.date) {
      latest = currentStack
    }
    return latest
  })
}

module.exports = {calculateLastEdited}