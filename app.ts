import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
export const app = express();
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
  TEST_DATABASE: process.env.TEST_DATABASE ?? "",
  NODE_ENV: process.env.NODE_ENV ?? "",
};
app.use(express.json());
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
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
import { router as commentRouter } from "./routes/comments";
import { router as followsRouter } from "./routes/follows";
import { router as likesRouter } from "./routes/likes";
import { router as postsRouter } from "./routes/posts";
import { router as userRouter } from "./routes/user";
import { router as userAuthRouter } from "./routes/userAuth";
app.use(
  "/api/",
  commentRouter,
  followsRouter,
  likesRouter,
  postsRouter,
  userRouter,
  userAuthRouter
);
