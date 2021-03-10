import { pool } from "../../app";

export const followerDataModel = async (username: string) => {
  const selectQuery = {
    text:
      "\
    SELECT ua.username, ua.location, up.photo, up.bio\
    FROM user_account AS ua\
    LEFT JOIN follows AS f ON f.following_user_id = ua.user_id\
    RIGHT JOIN user_profile AS up ON up.user_id = f.following_user_id\
    WHERE ua.username = $1\
    ",
    values: [username],
  };
  const data = await pool.query(selectQuery);
  return data.rows;
};
