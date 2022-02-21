function checkForPlaceholder(stacks){
  return stacks.some((stack) => (
    stack.stackId === "@"
  ))
}

module.exports = {checkForPlaceholder}