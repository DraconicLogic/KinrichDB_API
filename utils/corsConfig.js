const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 204,
  methods: ["GET", "POST", "DELETE", "OPTIONS", "PUT", "PATCH"],
  allowedHeader: "Content-Type",
}

module.exports = {corsOptions}