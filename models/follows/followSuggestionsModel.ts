import { pool } from "../../app";

export const followSuggestionsModel = async (user_id: number) => {
  const selectQuery = {
    text:
      "\
        SELECT ua.location, ua.username, up.* FROM user_account AS ua\
        FULL OUTER JOIN user_profile AS up ON up.user_id = ua.user_id\
        FULL OUTER JOIN follows AS f ON f.following_user_id = up.user_id\
        WHERE f.follower_user_id != $1\
        ",
    values: [user_id],
  };
  const data = await pool.query(selectQuery);
  return data.rows;
};
