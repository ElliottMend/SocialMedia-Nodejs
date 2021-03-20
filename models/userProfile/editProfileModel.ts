import { pool } from "../../server";

export const editProfileModel = async (
  latlng: Object,
  location: string,
  user_id: number,
  image: string,
  bio: string
) => {
  const updateAccountQuery = {
    text:
      "\
        UPDATE user_accounts AS ua\
            SET latlng = $1, location = $2\
        WHERE ua.user_id = $3",
    values: [latlng, location, user_id],
  };
  const updateProfileQuery = {
    text:
      "\
        UPDATE user_profiles AS up\
            SET photo = $1, bio = $2\
        WHERE up.user_id = $3",
    values: [image, bio, user_id],
  };
  await pool.query(updateAccountQuery);
  await pool.query(updateProfileQuery);
  return;
};
