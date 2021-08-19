const corsOptions = {
  origin: [
    "https://packinglist.netlify.app",
    "https://container-viewer.netlify.app"
  ],
  optionsSuccessStatus: 204,
  preflightContinue: true,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
}

module.exports = {corsOptions}