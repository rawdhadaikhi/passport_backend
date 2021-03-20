const mongoose = require("mongoose");
const config = require("config");

const mongoUri = config.get("DB_HOST");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("database is connected ... ");
  } catch (err) {
    console.error(err);
  }
};
module.exports = connectDB;
