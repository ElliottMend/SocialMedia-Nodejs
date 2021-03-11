import { pool } from "../../app";
export const removePostModel = async (post_id: number) => {
  const deleteQuery = {
    text: "DELETE FROM post WHERE post.post_id = $1",
    values: [post_id],
  };
  await pool.query(deleteQuery);
};
