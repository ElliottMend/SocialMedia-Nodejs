import { Client } from "pg";
import { secrets } from "../app";
export const client = new Client({
  connectionString: `postgres://${secrets.USER}:${secrets.PASSWORD}@localhost:5400/${secrets.TEST_DATABASE}`,
});
