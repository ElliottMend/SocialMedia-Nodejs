import { pool } from "../connection";

export const loginModel = async (email: string) => {
  const selectQuery = {
    text:
      "SELECT user_id, password, username FROM user_accounts WHERE email = $1",
    values: [email],
  };
  const result = await pool.query(selectQuery);
  if (result.rows.length > 0) {
    return result.rows[0];
  }
};
