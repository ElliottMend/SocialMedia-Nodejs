import { pool } from "../../app";

export const loginModel = async (email: string) => {
  const selectQuery = {
    text: "SELECT user_id, password, email FROM user_account WHERE email = $1",
    values: [email],
  };
  const result = await pool.query(selectQuery);
  if (result.rows.length > 0) {
    return result.rows[0];
  }
};
