import { pool } from "../../app";
export const getCommentModel = async (post_id: number) => {
  const selectQuery = {
    text: "\
        SELECT c.* FROM comments AS c WHERE post_id = $1\
        ",
    values: [post_id],
  };
  const data = await pool.query(selectQuery);
  return data.rows;
};
