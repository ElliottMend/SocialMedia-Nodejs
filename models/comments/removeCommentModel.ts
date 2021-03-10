import { pool } from "../../app";

export const removeCommentModel = async (comment_id: number) => {
  const deleteQuery = {
    text: "\
        DELETE FROM comment WHERE comment_id = $1 \
        ",
    values: [comment_id],
  };
  await pool.query(deleteQuery);
  return;
};
