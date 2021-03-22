import { pool } from "../../server";

export const checkUserFollowModel = async (
  userId: number,
  username: string
) => {
  const selectQuery = {
    text:
      "\
        SELECT f.following_user_id FROM follows AS f\
        INNER JOIN user_accounts AS ua ON f.following_user_id = ua.user_id\
        WHERE f.follower_user_id = $1 AND ua.username=$2\
        ",
    values: [userId, username],
  };
  const data = await pool.query(selectQuery);
  return data.rows;
};
