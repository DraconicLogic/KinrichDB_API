function removePlaceholders(stacks){
  return stacks.filter((stack) => {
    return stack.stackId !== "@"
  })
}

module.exports = {removePlaceholders}