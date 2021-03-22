import { Pool } from "pg";
import { secrets } from "../app";
export const setupDatabase = () => {
  const pool = new Pool({
    connectionString: `postgres://${secrets.USER}:${secrets.PASSWORD}@localhost:5400/${secrets.TEST_DATABASE}`,
  });
  pool.query("DELETE FROM user_profiles");
  pool.query("DELETE FROM user_accounts");
  return pool;
};
