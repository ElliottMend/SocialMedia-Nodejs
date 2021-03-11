import { pool } from "../../app";

export const userEditModel = async (user_id: number) => {
  const query = {
    text:
      "\
          SELECT ua.latlng, up.photo, ua.location, up.bio FROM user_account ua\
            INNER JOIN user_profile AS up ON ua.user_id = up.user_id\
              WHERE ua.user_id = $1",
    values: [user_id],
  };
  const user = await pool.query(query);
  return user.rows[0];
};
