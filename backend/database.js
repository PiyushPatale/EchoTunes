import { connect } from "mongoose";
require("dotenv");
// const uri = "mongodb://localhost:27017/echo";

const connectToMongo = () => {
  connect("mongodb+srv://echo:echo123@echo.jx4xkuo.mongodb.net/?retryWrites=true&w=majority&appName=echo")
    .then(() => {
    console.log("Connected to Mongo");
    })
    .catch((e) => {
    console.error(e);
  })
};

export default connectToMongo;