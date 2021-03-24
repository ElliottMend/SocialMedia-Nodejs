import { Pool } from "pg";
import { secrets } from "../app";
export const pool = new Pool({
  connectionString: !secrets.NODE_ENV
    ? `postgres://${secrets.USER}:${secrets.PASSWORD}@${secrets.DATABASE_CONTAINER}:${secrets.DATABASE_PORT}/${secrets.DATABASE}`
    : `postgres://${secrets.USER}:${secrets.PASSWORD}@${secrets.TEST_DATABASE_CONTAINER}:${secrets.TEST_DATABASE_PORT}/${secrets.DATABASE}`,

  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
