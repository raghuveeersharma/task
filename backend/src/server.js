import express from "express";
import { router } from "./routes/user.routes.js";
import db from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", router);

app.listen(4000, () => {
  console.log(`Server is running on http://localhost:4000`);
  db();
});
