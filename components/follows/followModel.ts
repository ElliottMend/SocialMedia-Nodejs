import { pool } from "../../connection";

export const addFollowModel = async (userId: number, followingUser: number) => {
  const insertFollowQuery = {
    text:
      "\
        INSERT INTO follows(follower_user_id, following_user_id) VALUES($1,$2)\
        ",
    values: [userId, followingUser],
  };

  const updateFollowingQuery = {
    text:
      "\
      WITH user_profiles AS(\
        UPDATE user_profiles\
          SET followers = followers + 1\
            WHERE user_id = $1\
      )\
      UPDATE user_profiles\
        SET following = following + 1\
          WHERE user_id = $2\
    ",
    values: [followingUser, userId],
  };
  await pool.query(insertFollowQuery);
  await pool.query(updateFollowingQuery);
  return;
};

export const checkUserFollowModel = async (
  currentUserId: number,
  userId: number
) => {
  const selectQuery = {
    text:
      "\
        SELECT f.following_user_id FROM follows AS f\
        INNER JOIN user_accounts AS ua ON f.following_user_id = ua.user_id\
        WHERE f.follower_user_id = $1 AND ua.user_id=$2\
        ",
    values: [currentUserId, userId],
  };
  return (await pool.query(selectQuery)).rows;
};

export const followerDataModel = async (username: number) => {
  const selectQuery = {
    text:
      "\
      SELECT ua.username, ua.location, up.photo, up.bio\
      FROM user_accounts AS ua\
      RIGHT JOIN user_profiles AS up ON up.user_id = ua.user_id\
        LEFT JOIN follows AS f ON f.follower_user_id = up.user_id\
          WHERE f.following_user_id = $1\
    ",
    values: [username],
  };
  return (await pool.query(selectQuery)).rows;
};

export const followingDataModel = async (userId: number) => {
  const selectQuery = {
    text:
      "\
        SELECT ua.username, ua.location, up.photo, up.bio\
          FROM user_accounts AS ua\
          RIGHT JOIN user_profiles AS up ON up.user_id = ua.user_id\
            LEFT JOIN follows AS f ON f.following_user_id = up.user_id\
              WHERE f.follower_user_id = $1\
        ",
    values: [userId],
  };
  return (await pool.query(selectQuery)).rows;
};

export const followSuggestionsModel = async (userId: number) => {
  const selectQuery = {
    text:
      "\
      SELECT ua.location, ua.username, up.* FROM user_accounts AS ua\
      RIGHT JOIN user_profiles AS up ON up.user_id = ua.user_id\
      LEFT JOIN follows AS f ON f.following_user_id = up.user_id\
      WHERE ua.user_id != $1 AND (f.follower_user_id != $1 OR f.follower_user_id IS NULL)\
      LIMIT 5\
      ",
    values: [userId],
  };
  return (await pool.query(selectQuery)).rows;
};

export const removeFollowModel = async (
  userId: number,
  followingUser: number
) => {
  const insertFollowQuery = {
    text:
      "\
        DELETE FROM follows WHERE following_user_id = $2 AND follower_user_id = $1\
        ",
    values: [userId, followingUser],
  };
  const updateFollowingQuery = {
    text:
      "\
    WITH user_profiles AS(\
      UPDATE user_profiles\
        SET followers = followers - 1\
          WHERE user_id = $1\
    )\
    UPDATE user_profiles\
      SET following = following - 1\
        WHERE user_id = $2\
  ",
    values: [followingUser, userId],
  };
  await pool.query(insertFollowQuery);
  await pool.query(updateFollowingQuery);
  return;
};
