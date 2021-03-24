import { pool } from "../connection";

export const userEditModel = async (userId: number) => {
  const query = {
    text:
      "\
          SELECT ua.latlng, up.photo, ua.location, up.bio FROM user_accounts ua\
            INNER JOIN user_profiles AS up ON ua.user_id = up.user_id\
              WHERE ua.user_id = $1",
    values: [userId],
  };
  const user = await pool.query(query);
  return user.rows[0];
};
