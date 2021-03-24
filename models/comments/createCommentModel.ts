import { pool } from "../connection";

export const createCommentModel = async (
  text: string,
  userId: number,
  postId: number
) => {
  const insertCommentQuery = {
    text:
      "\
        INSERT INTO comments(body,user_id,post_id) VALUES ($1,$2,$3) RETURNING *\
        ",
    values: [text, userId, postId],
  };
  const data = await pool.query(insertCommentQuery);
  return data.rows[0];
};
