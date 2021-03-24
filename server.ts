import { secrets } from "./app";
import { app } from "./app";
import { Pool } from "pg";

if (secrets.NODE_ENV !== "test") {
  app.listen(secrets.PORT || 5000);
}
