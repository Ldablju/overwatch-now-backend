const mongoose = require("mongoose");
const log = require('../logger/index');

exports.connection = () => {
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      log.info("Server connecting to MongoDB");
    })
    .catch((error) => {
      log.info("MongoDB connection doesn't work");
      console.error(error);
    });
};