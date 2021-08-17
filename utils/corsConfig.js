const allowedOrigins = [
  "https://packinglist.netlify.app/",
  "https://container-viewer.netlify.app/"
]

const corsOptions = {
  origin: (origin, callback) => {
    if(allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      const msg = "The CORS policy for this site does not \n allow access from the specified Origin."
       return callback(new Error(msg), false)
    }
  },
  optionsSuccessStatus: 204
}

module.exports = {corsOptions}