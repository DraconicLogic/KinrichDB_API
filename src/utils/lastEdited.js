function calculateLastEdited(stacks){
  if (stacks.length < 1){
   return {date: "1970-01-01T00:00:00Z"}
  } else {
    return stacks.reduce((latest, currentStack) => {
      if (currentStack.date > latest.date) {
        latest = currentStack
      }
    return latest
    })
  }
}

module.exports = {calculateLastEdited}
