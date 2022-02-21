const corsOptions = {
  origin: true,
  optionsSuccessStatus: 204,
  methods: ["GET", "POST", "DELETE", "OPTIONS", "PUT", "PATCH"],
  allowedHeader: ["Content-Type", "application/json"]
}

module.exports = {corsOptions}