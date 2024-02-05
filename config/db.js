require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://JediLegendForce:${process.env.DB_PASSWORD}@cluster-proyectoux1.eznpou7.mongodb.net/?retryWrites=true&w=majority`
    );

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message+" mongo");
    process.exit(1);
  }
};


module.exports = connectDB;