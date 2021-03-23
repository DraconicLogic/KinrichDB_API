const allowedOrigins = [
  "http://localhost:3000",
  "https://packinglist.netlify.app/",
  "https://container-viewer.netlify.app/"
]

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true)

    if(!allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not \n allow access from the specified Origin."
       return cb(new Error(msg), false)
    }

    return cb(null, true)
  },
  optionsSuccessStatus: 204
}

module.exports = {corsOptions}