import { NextFunction, Response } from "express";
import { pool } from "../../server";

export const registerModel = async (
  username: string,
  password: string,
  email: string
) => {
  const insertAccountQuery = {
    text:
      "INSERT INTO user_accounts(username, password, email) VALUES($1,$2,$3) RETURNING *",
    values: [username.trim(), password, email.trim()],
  };
  const userAccount = await pool.query(insertAccountQuery);
  const insertProfileQuery = {
    text: "INSERT INTO user_profiles(user_id) VALUES ($1)",
    values: [userAccount.rows[0].user_id],
  };
  await pool.query(insertProfileQuery);
  return;
};
