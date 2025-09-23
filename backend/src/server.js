import express from "express";
import { router } from "./routes/user.routes.js";
import db from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "https://task-five-gold.vercel.app",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", router);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  db();
});
