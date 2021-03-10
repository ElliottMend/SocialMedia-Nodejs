import { pool } from "../../app";

export const checkUserFollowModel = async (user_id: number) => {
  const selectQuery = {
    text:
      "\
        SELECT * FROM follows AS f\
        WHERE f.follower_user_id = $1\
        ",
    values: [user_id],
  };
  const data = await pool.query(selectQuery);
  return data.rows[0];
};
