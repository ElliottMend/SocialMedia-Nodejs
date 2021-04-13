import { pool } from "../../connection";

export const loginModel = async (email: string) => {
  const selectQuery = {
    text:
      "SELECT user_id, password, username FROM user_accounts WHERE email = $1",
    values: [email],
  };
  const result = await pool.query(selectQuery);
  if (result.rows.length > 0) {
    return result.rows[0];
  } else {
    throw 400;
  }
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
  const userAccount = await pool.query(insertAccountQuery);
  const insertProfileQuery = {
    text: "INSERT INTO user_profiles(user_id) VALUES ($1)",
    values: [userAccount.rows[0].user_id],
  };
  return (await pool.query(insertProfileQuery)).rows;
};

export const registerSelectModel = async (username: string, email: string) => {
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
  return (await pool.query(selectQuery)).rows;
};
