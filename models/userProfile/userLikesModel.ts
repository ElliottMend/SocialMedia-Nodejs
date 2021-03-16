import { pool } from "../../app";
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
