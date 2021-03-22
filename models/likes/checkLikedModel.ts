import { pool } from "../../server";

export const checkLikedModel = async (userId: number, postId: number) => {
  const selectQuery = {
    text:
      "\
        SELECT * FROM likes WHERE user_id = $1 AND post_id = $2\
        ",
    values: [userId, postId],
  };
  const data = await pool.query(selectQuery);
  return data.rows;
};
