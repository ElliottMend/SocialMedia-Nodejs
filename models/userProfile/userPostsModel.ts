import { pool } from "../connection";
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
