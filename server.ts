import { secrets } from "./app";
import { app } from "./app";
import cookieParser from "cookie-parser";
import cors from "cors";

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

app.listen(secrets.PORT || 5000);
