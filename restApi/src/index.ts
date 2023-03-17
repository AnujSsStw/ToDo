import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import crudRouter from "./routes/crud";
import cookie from "cookie-parser";
import { isAuth } from "./middleware";

const PORT = 6969;
const DB = "mongodb://localhost:27017";
export const key = "6969";

const main = async () => {
  const app = express();
  mongoose
    .connect(DB, { user: "user", pass: "pass" })
    .then((_) => console.log("connected to db"));

  app.use(express.json());
  app.use(cookie());

  app.use("", authRouter);
  app.use("", isAuth, crudRouter);

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
};

main().catch((e) => console.log("error from main: ", e));
