const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const productInOrder = require('./productsInOrder.json')

async function createCSV(req, res, next) {
  const { newContainer } = req.body
  if (newContainer) {
    
    const contentObject = createContentObject(newContainer.containerContent)
    console.log('contentObject: ',contentObject)
    const orderedContainer = putInOrder(contentObject)
    const formattedRecords = formatContainer(orderedContainer)
    const fileName = `${newContainer.date}_container.csv`
    newContainer.fileName = fileName
    
    const csvWriter = createCsvWriter({
      path: `./${fileName}`,
      header:[
        {id: 'index', title: '#'},
        {id: "product", title: 'Product'},
        {id: "quantity", title: "Quantity"}
      ]
    })
    
    await csvWriter.writeRecords(formattedRecords)
      .then(() => {
        console.log("...file created")
        next()
      })

  
  } else {
    console.log("NO NEW CONTAINER")
    next()
  }
}

function createContentObject(containerContent) {
  return containerContent.reduce((obj,stack) => {
    stack.stackContent.forEach((bale) => {
      if(!obj[bale]) obj[bale] = 1
      else obj[bale] += 1
    })
    return obj
  }, {})
}

function putInOrder(contentObj) {
  return productInOrder.reduce((ordered, product) => {
    if (contentObj[product]) {
      ordered.push({[product]: contentObj[product]})
    }
    return ordered
  },[])
}

function formatContainer(orderedContainer) {
  return orderedContainer.reduce((formatted, entry, index) => {
    const entryObj = {
      index: index,
      product: Object.keys(entry)[0],
      quantity: Object.values(entry)[0]
    }
    formatted.push(entryObj)
    return formatted
  },[])
}


module.exports = {createCSV}