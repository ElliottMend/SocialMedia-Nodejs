import { pool } from "../connection";
import fs from "fs";
import path from "path";
module.exports = async () => {
  await pool.query("\
  DROP SCHEMA IF EXISTS public CASCADE\
  ");
  await pool.query("\
  CREATE SCHEMA IF NOT EXISTS public\
  ");
  const sqlPath = path.join(process.cwd() + "/postgres/socialmedia.sql");
  const sql = fs.readFileSync(sqlPath).toString();
  await pool.query(sql);
  await pool.query(
    "INSERT INTO public.user_accounts(username, password, email) VALUES($1,$2,$3)",
    ["username", "password1", "em@em.com"]
  );
  await pool.query("INSERT INTO public.user_profiles(user_id) VALUES($1)", [1]);
};
