import { pool } from "../../app";
export const userLikesModel = async (username: string) => {
  const likesQuery = {
    text:
      "\
        SELECT p.*  \
        FROM user_account AS ua\
        INNER JOIN likes AS l ON ua.user_id = l.user_id\
        RIGHT JOIN post AS p ON l.post_id = p.post_id\
        WHERE ua.username = $1\
        ",
    values: [username],
  };
  const likes = await pool.query(likesQuery);
  return likes.rows;
};
