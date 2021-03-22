import { pool } from "../../server";

export const removeCommentModel = async (commentId: number) => {
  const deleteQuery = {
    text: "\
        DELETE FROM comments WHERE comment_id = $1 \
        ",
    values: [commentId],
  };
  return await pool.query(deleteQuery);
};
