import { pool } from "../connection";
module.exports = async () => {
  await pool.query(
    "\
    DROP SCHEMA public CASCADE;\
    CREATE SCHEMA public;\
  "
  );
  await pool.end();
};
