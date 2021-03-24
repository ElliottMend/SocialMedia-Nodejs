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
        UPDATE user_profiles\
            SET followers = followers + 1\
                WHERE user_id = $1\
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
  userId: number,
  username: string
) => {
  const selectQuery = {
    text:
      "\
        SELECT f.following_user_id FROM follows AS f\
        INNER JOIN user_accounts AS ua ON f.following_user_id = ua.user_id\
        WHERE f.follower_user_id = $1 AND ua.username=$2\
        ",
    values: [userId, username],
  };
  const data = await pool.query(selectQuery);
  return data.rows;
};

export const followerDataModel = async (username: string) => {
  const selectQuery = {
    text:
      "\
    SELECT ua.username, ua.location, up.photo, up.bio\
    FROM user_accounts AS ua\
    LEFT JOIN follows AS f ON f.following_user_id = ua.user_id\
    RIGHT JOIN user_profiles AS up ON up.user_id = f.following_user_id\
    WHERE ua.username = $1\
    ",
    values: [username],
  };
  const data = await pool.query(selectQuery);
  return data.rows;
};

export const followingDataModel = async (username: string) => {
  const selectQuery = {
    text:
      "\
        SELECT ua.username, ua.location, up.photo, up.bio\
        FROM user_accounts AS ua\
        LEFT JOIN follows AS f ON f.follower_user_id = ua.user_id\
        RIGHT JOIN user_profiles AS up ON up.user_id = f.follower_user_id\
        WHERE ua.username = $1\
        ",
    values: [username],
  };
  const data = await pool.query(selectQuery);
  return data.rows;
};

export const followSuggestionsModel = async (userId: number) => {
  const selectQuery = {
    text:
      "\
        SELECT ua.location, ua.username, up.* FROM user_accounts AS ua\
        FULL OUTER JOIN user_profiles AS up ON up.user_id = ua.user_id\
        FULL OUTER JOIN follows AS f ON f.follower_user_id = up.user_id\
        WHERE ua.user_id != $1 AND (f.following_user_id IS NULL OR f.following_user_id != $1)\
        LIMIT 5\
        ",
    values: [userId],
  };
  const data = await pool.query(selectQuery);
  return data.rows;
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
        UPDATE user_profiles\
            SET followers = followers - 1\
                WHERE user_id = $1\
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
