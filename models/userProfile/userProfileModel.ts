import { pool } from "../../app";
export const userProfileModel = async (username: string) => {
  const profileQuery = {
    text:
      "\
      SELECT up.*, ua.location, ua.username   \
      FROM user_accounts AS ua\
      INNER JOIN user_profiles AS up ON ua.user_id = up.user_id\
      WHERE ua.username = $1\
      ",
    values: [username],
  };
  const profile = await pool.query(profileQuery);
  return profile.rows[0];
};
