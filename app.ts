require("dotenv").config();
import express from "express";
import cookieParser from "cookie-parser";
import { Pool } from "pg";
import cors from "cors";

const app = express();
export const secrets = {
  USER: process.env.USER ?? "",
  PASSWORD: process.env.PASSWORD ?? "",
  DATABASE: process.env.DATABASE ?? "",
  SECURE: process.env.SECURE ?? "",
  ACCESS_TOKEN: process.env.ACCESS_TOKEN ?? "",
  REFRESH_TOKEN: process.env.REFRESH_TOKEN ?? "",
  REACT_PLACES_API_KEY: process.env.REACT_PLACES_API_KEY ?? "",
  PORT: process.env.PORT ?? "",
  REQUEST_ORIGIN: process.env.REQUEST_ORIGIN ?? "",
};
app.use(
  cors({
    credentials: true,
    origin: secrets.REQUEST_ORIGIN,
    methods: ["GET, POST, OPTIONS, PUT, PATCH, DELETE"],
    allowedHeaders: [
      "Authorization",
      "X-API-KEY",
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Access-Control-Allow-Request-Method",
    ],
  })
);
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
