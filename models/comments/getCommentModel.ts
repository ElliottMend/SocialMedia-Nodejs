import { pool } from "../../app";
export const getCommentModel = async (post_id: number) => {
  const selectQuery = {
    text: "\
        SELECT c.* FROM comments WHERE post_id = $1\
        ",
    values: [post_id],
  };
  await pool.query(selectQuery);
  return;
};
