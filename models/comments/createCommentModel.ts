import { pool } from "../../app";

export const createCommentModel = async (
  text: string,
  user_id: number,
  post_id: number
) => {
  const insertCommentQuery = {
    text:
      "\
        INSERT INTO comment(body,user_id,post_id) VALUES ($1,$2,$3)\
        ",
    values: [text, user_id, post_id],
  };
  await pool.query(insertCommentQuery);
  return;
};
