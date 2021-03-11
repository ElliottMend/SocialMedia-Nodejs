require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import express from "express";
import cookieParser from "cookie-parser";
import { Pool } from "pg";

const app = express();
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});
export const secrets = {
  USER: process.env.USER ?? "",
  PASSWORD: process.env.PASSWORD ?? "",
  DATABASE: process.env.DATABASE ?? "",
  SECURE: process.env.SECURE ?? "",
  ACCESS_TOKEN: process.env.ACCESS_TOKEN ?? "",
  REFRESH_TOKEN: process.env.REFRESH_TOKEN ?? "",
  PORT: process.env.PORT ?? "",
};
let connectionString = `postgres://${secrets.USER}:${secrets.PASSWORD}@localhost:5400/${secrets.DATABASE}`;
export const pool = new Pool({
  connectionString: connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(require("./routes/comments"));
app.use(require("./routes/follows"));
app.use(require("./routes/likes"));
app.use(require("./routes/posts"));
app.use(require("./routes/user"));
app.use(require("./routes/userAuth"));
app.listen(secrets.PORT || 5000);
