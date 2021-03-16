import { pool } from "../../app";

export const checkLikedModel = async (user_id: number, post_id: number) => {
  const selectQuery = {
    text:
      "\
        SELECT * FROM likes WHERE user_id = $1 AND post_id = $2\
        ",
    values: [user_id, post_id],
  };
  const data = await pool.query(selectQuery);
  return data.rows;
};
