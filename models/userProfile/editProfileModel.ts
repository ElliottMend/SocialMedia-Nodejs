import { pool } from "../connection";

export const editProfileModel = async (
  latlng: object,
  location: string,
  userId: number,
  image: string,
  bio: string
) => {
  const updateAccountQuery = {
    text:
      "\
        UPDATE user_accounts AS ua\
            SET latlng = $1, location = $2\
        WHERE ua.user_id = $3",
    values: [latlng, location, userId],
  };
  const updateProfileQuery = {
    text:
      "\
        UPDATE user_profiles AS up\
            SET photo = $1, bio = $2\
        WHERE up.user_id = $3",
    values: [image, bio, userId],
  };
  await pool.query(updateAccountQuery);
  await pool.query(updateProfileQuery);
  return;
};
