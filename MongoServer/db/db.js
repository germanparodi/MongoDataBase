const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://German:bestia09@clustergerman.vrajp.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected Database");
  } catch (error) {
    console.log(error);
    throw new Error("Error when starting Database");
  }
};

module.exports = { dbConnection };
