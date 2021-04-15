import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
export const app = express();
import cookieParser from "cookie-parser";

interface ISecrets {
  [key: string]: string;
}
export const secrets: ISecrets = {
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
  TEST_DATABASE_PORT: process.env.TEST_DATABASE_PORT ?? "",
  DATABASE_PORT: process.env.DATABASE_PORT ?? "",
  DATABASE_CONTAINER: process.env.DATABASE_CONTAINER ?? "",
  TEST_DATABASE_CONTAINER: process.env.TEST_DATABASE_CONTAINER ?? "",
  DOCKERBUILD: process.env.DOCKERBUILD ?? "",
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
import { commentsRouter } from "./routes/comments";
import { followsRouter } from "./routes/follows";
import { likesRouter } from "./routes/likes";
import { postsRouter } from "./routes/posts";
import { userRouter } from "./routes/user";
import { userAuthRouter } from "./routes/userAuth";
app.use(
  "/api/",
  commentsRouter,
  followsRouter,
  likesRouter,
  postsRouter,
  userRouter,
  userAuthRouter
);
