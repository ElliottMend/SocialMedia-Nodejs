import { pool } from "../connection";
module.exports = async () => {
  await pool.query("\
  DROP SCHEMA IF EXISTS public CASCADE\
  ");
  await pool.query("CREATE SCHEMA IF NOT EXISTS public");
  await pool.end();
};
