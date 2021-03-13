import { pool } from "../../app";

export const newPostModel = async (body: string, user_id: number) => {
  const insertQuery = {
    text: "INSERT INTO posts(body, user_id) VALUES($1, $2) RETURNING *",
    values: [body, user_id],
  };
  const query = await pool.query(insertQuery);
  return query.rows[0];
};
