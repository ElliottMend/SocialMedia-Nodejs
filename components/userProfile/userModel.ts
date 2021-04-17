import { QueryResult, QueryResultRow } from "pg";
import { pool } from "../../connection";

export const editProfileModel = async (
  latlng: object,
  location: string,
  userId: number,
  image: string,
  bio: string
) => {
  const user = await checkUserExistsModel(userId);
  if (!user[0]) throw 400;
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

export const getUserIdByUsername = async (username: string) => {
  const checkUser = {
    text: "SELECT user_id FROM user_accounts WHERE username = $1",
    values: [username],
  };
  return (await pool.query(checkUser)).rows;
};

export const checkUserExistsModel = async (userId: number) => {
  const checkUser = {
    text: "SELECT ua.user_id FROM user_accounts AS ua WHERE ua.user_id = $1",
    values: [userId],
  };
  return (await pool.query(checkUser)).rows;
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
  return (await pool.query(query)).rows;
};

export const userLikesModel = async (userId: number) => {
  const likesQuery = {
    text:
      "\
        SELECT p.*, up.photo, ua.location, ua.username  \
        FROM user_accounts AS ua\
        INNER JOIN likes AS l ON ua.user_id = l.user_id\
        RIGHT JOIN posts AS p ON l.post_id = p.post_id\
        LEFT JOIN user_profiles AS up ON ua.user_id = up.user_id\
        WHERE ua.user_id = $1\
        ",
    values: [userId],
  };
  return (await pool.query(likesQuery)).rows;
};

export const userPostsModel = async (userId: number) => {
  const postQuery = {
    text:
      "\
        SELECT p.*, ua.location, ua.username, up.bio, up.photo  \
        FROM user_accounts AS ua\
        INNER JOIN posts AS p ON ua.user_id = p.user_id\
        LEFT JOIN user_profiles AS up on p.user_id = up.user_id\
        WHERE ua.user_id = $1\
      ",
    values: [userId],
  };
  return (await pool.query(postQuery)).rows;
};
export const userCommentModel = async (userId: number) => {
  const likesQuery = {
    text:
      "\
        SELECT p.*, up.photo, ua.location, ua.username  \
        FROM user_accounts AS ua\
        INNER JOIN comments AS c ON ua.user_id = c.user_id\
        RIGHT JOIN posts AS p ON c.post_id = p.post_id\
        LEFT JOIN user_profiles AS up ON ua.user_id = up.user_id\
        WHERE ua.user_id = $1\
        ",
    values: [userId],
  };
  return (await pool.query(likesQuery)).rows;
};
export const userProfileModel = async (userId: number) => {
  const postQuery = {
    text:
      "\
      SELECT up.*, ua.location, ua.username   \
      FROM user_accounts AS ua\
      INNER JOIN user_profiles AS up ON ua.user_id = up.user_id\
      WHERE ua.user_id = $1\
      ",
    values: [userId],
  };
  return (await pool.query(postQuery)).rows;
};
