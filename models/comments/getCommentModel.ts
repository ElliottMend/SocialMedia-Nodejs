import { pool } from "../../app";
export const getCommentModel = async (post_id: number) => {
  const selectQuery = {
    text:
      "\
        SELECT c.*, ua.location, ua.username, up.photo\
        FROM comments AS c\
        INNER JOIN user_accounts AS ua ON c.user_id = ua.user_id\
        INNER JOIN user_profiles AS up ON ua.user_id = up.user_id\
        WHERE c.post_id = $1\
      ",
    values: [post_id],
  };
  const data = await pool.query(selectQuery);
  return data.rows;
};
