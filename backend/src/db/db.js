import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoDbURI = process.env.mongoDB;

const db = () => {
  mongoose
    .connect(mongoDbURI)
    .then(console.log(`database connected successfully!!`))
    .catch((error) => {
      console.log("error in db connection", error);
    });
};

export default db;
