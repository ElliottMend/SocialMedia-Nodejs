import { NextFunction, Response } from "express";
import { pool } from "../../server";

export const registerModel = async (
  username: string,
  password: string,
  email: string,
  res: Response
) => {
  const selectQuery = {
    text:
      "\
        SELECT username\
          FROM user_accounts\
            WHERE username = $1\
        UNION\
        SELECT email\
          FROM user_accounts\
            WHERE email = $2 \
      ",
    values: [username.trim(), email.trim()],
  };
  const insertAccountQuery = {
    text:
      "INSERT INTO user_accounts(username, password, email) VALUES($1,$2,$3) RETURNING *",
    values: [username.trim(), password, email.trim()],
  };

  try {
    const query = await pool.query(selectQuery);
    if (query.rows.length > 0) {
      return query.rows;
    } else {
      const userAccount = await pool.query(insertAccountQuery);
      const insertProfileQuery = {
        text: "INSERT INTO user_profiles(user_id) VALUES ($1)",
        values: [userAccount.rows[0].user_id],
      };
      await pool.query(insertProfileQuery);
      return;
    }
  } catch (err) {
    res.sendStatus(400);
  }
};
