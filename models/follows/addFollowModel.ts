import { pool } from "../connection";

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
