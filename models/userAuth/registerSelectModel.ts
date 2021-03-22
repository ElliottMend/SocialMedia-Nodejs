import { pool } from "../../server";
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
  const query = await pool.query(selectQuery);
  return query.rows;
};
