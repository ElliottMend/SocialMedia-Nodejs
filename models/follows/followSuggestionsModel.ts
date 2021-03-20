import { pool } from "../../server";

export const followSuggestionsModel = async (user_id: number) => {
  const selectQuery = {
    text:
      "\
        SELECT ua.location, ua.username, up.* FROM user_accounts AS ua\
        FULL OUTER JOIN user_profiles AS up ON up.user_id = ua.user_id\
        FULL OUTER JOIN follows AS f ON f.follower_user_id = up.user_id\
        WHERE ua.user_id != $1 AND (f.following_user_id IS NULL OR f.following_user_id != $1)\
        LIMIT 5\
        ",
    values: [user_id],
  };
  const data = await pool.query(selectQuery);
  return data.rows;
};
