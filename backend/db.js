const mongoose = require("mongoose");
const mongoURI = "mongodb://0.0.0.0:27017/iNotebook";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Mongodb is Connected Successfully");
    })
    .catch((error) => {
      console.log("Error while connecting to Mongodb\nError :: " + error);
    });
};

module.exports = connectToMongo;
