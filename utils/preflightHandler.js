function preflightHandler(req, res, next) {  
  if (req.method !== "OPTIONS") {     
    next()
    return;
  } 
  res.status(204)
}

module.exports = { preflightHandler}