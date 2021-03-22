import { secrets } from "./app";
import { app } from "./app";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: `postgres://${secrets.USER}:${
    secrets.PASSWORD
  }@localhost:5400/${
    !secrets.NODE_ENV ? secrets.TEST_DATABASE : secrets.DATABASE
  }`,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
if (secrets.NODE_ENV !== "test") {
  app.listen(secrets.PORT || 5000);
} else {
  pool.query("DELETE");
}
