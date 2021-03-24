import { pool } from "../connection";

export const newPostModel = async (body: string, userId: number) => {
  const insertQuery = {
    text: "INSERT INTO posts(body, user_id) VALUES($1, $2) RETURNING *",
    values: [body, userId],
  };
  const query = await pool.query(insertQuery);
  return query.rows[0];
};
