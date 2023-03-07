const mongoose = require("mongoose");
const mongoURI = "mongodb://0.0.0.0:27017";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Mongodb Connected Successfully");
    })
    .catch(() => {
      console.log("Error while connecting Mongodb");
    });
};

module.exports = connectToMongo;
