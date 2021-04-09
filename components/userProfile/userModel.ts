import { pool } from "../../connection";

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

export const userLikesModel = async (username: string) => {
  const likesQuery = {
    text:
      "\
        SELECT p.*, up.photo, ua.location, ua.username  \
        FROM user_accounts AS ua\
        INNER JOIN likes AS l ON ua.user_id = l.user_id\
        RIGHT JOIN posts AS p ON l.post_id = p.post_id\
        LEFT JOIN user_profiles AS up ON ua.user_id = up.user_id\
        WHERE ua.username = $1\
        ",
    values: [username],
  };
  const likes = await pool.query(likesQuery);
  return likes.rows;
};

export const userPostsModel = async (username: string) => {
  const postQuery = {
    text:
      "\
        SELECT p.*, ua.location, ua.username, up.bio, up.photo  \
        FROM user_accounts AS ua\
        INNER JOIN posts AS p ON ua.user_id = p.user_id\
        LEFT JOIN user_profiles AS up on p.user_id = up.user_id\
        WHERE ua.username = $1\
      ",
    values: [username],
  };
  const posts = await pool.query(postQuery);
  return posts.rows;
};

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
