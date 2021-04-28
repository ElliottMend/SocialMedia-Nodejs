import { pool } from "../../connection";
interface IQuery {
  user_id: number;
  password: string;
  username: string;
}

export interface ISelectQuery {
  username: string;
}
export const loginModel = async (email: string) => {
  const selectQuery = {
    text:
      "SELECT user_id, password, username FROM user_accounts WHERE email = $1",
    values: [email],
  };
  return (await pool.query<IQuery>(selectQuery)).rows;
};

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
  const userAccount = await pool.query<IQuery>(insertAccountQuery);
  const insertProfileQuery = {
    text: "INSERT INTO user_profiles(user_id) VALUES ($1)",
    values: [userAccount.rows[0].user_id],
  };
  await pool.query(insertProfileQuery);
};

export const registerSelectModel = async (username: string, email: string) => {
  const selectQuery = {
    text:
      "\
      SELECT FROM user_accounts WHERE username = $1 or email = $2\
        ",
    values: [username.trim(), email.trim()],
  };
  return (await pool.query<ISelectQuery>(selectQuery)).rows;
};
