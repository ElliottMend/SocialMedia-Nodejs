import { secrets } from "./app";
import { app } from "./app";

import { Pool } from "pg";

let connectionString = `postgres://${secrets.USER}:${secrets.PASSWORD}@localhost:5400/${secrets.DATABASE}`;
export const pool = new Pool({
  connectionString: connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

app.listen(secrets.PORT || 5000);
