import { Pool } from "pg";
import { secrets } from "./app";

const connectionString = `postgres://${secrets.USER}:${secrets.PASSWORD}@${
  secrets.DOCKERBUILD
    ? secrets.NODE_ENV
      ? `${secrets.TEST_DATABASE_CONTAINER}:${secrets.DATABASE_PORT}/${secrets.TEST_DATABASE}`
      : `${secrets.DATABASE_CONTAINER}:${secrets.DATABASE_PORT}/${secrets.DATABASE}`
    : `localhost:5400/${
        secrets.NODE_ENV ? secrets.TEST_DATABASE : secrets.DATABASE
      }`
}`;
export const pool = new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
