import { pool } from "../../app";

export const createCommentModel = async (
  text: string,
  user_id: number,
  post_id: number
) => {
  const insertCommentQuery = {
    text:
      "\
        INSERT INTO comments(body,user_id,post_id) VALUES ($1,$2,$3) RETURNING *\
        ",
    values: [text, user_id, post_id],
  };
  const data = await pool.query(insertCommentQuery);
  return data.rows[0];
};
