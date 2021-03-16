import { pool } from "../../app";

export const removeCommentModel = async (comment_id: number) => {
  const deleteQuery = {
    text: "\
        DELETE FROM comments WHERE comment_id = $1 \
        ",
    values: [comment_id],
  };
  return await pool.query(deleteQuery);
};
