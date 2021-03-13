import { pool } from "../../app";

export const checkUserFollowModel = async (
  user_id: number,
  username: string
) => {
  const selectQuery = {
    text:
      "\
        SELECT f.following_user_id FROM follows AS f\
        INNER JOIN user_accounts AS ua ON f.following_user_id = ua.user_id\
        WHERE f.follower_user_id = $1 AND ua.username=$2\
        ",
    values: [user_id, username],
  };
  const data = await pool.query(selectQuery);
  return data.rows;
};
