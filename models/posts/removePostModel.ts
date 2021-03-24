import { pool } from "../connection";
export const removePostModel = async (postId: number) => {
  const deleteQuery = {
    text: "DELETE FROM posts WHERE posts.post_id = $1",
    values: [postId],
  };
  await pool.query(deleteQuery);
};
