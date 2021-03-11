import { pool } from "../../app";
export const userPostsModel = async (username: string) => {
  const postQuery = {
    text:
      "\
            SELECT p.*  \
            FROM user_account AS ua\
            INNER JOIN post AS p ON ua.user_id = p.user_id\
            WHERE ua.username = $1\
            ",
    values: [username],
  };
  const posts = await pool.query(postQuery);
  return posts.rows;
};
