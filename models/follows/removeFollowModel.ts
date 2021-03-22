import { pool } from "../../server";

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
