import { pool } from "../../app";
export const removeLikesModel = async (user_id: number, post_id: number) => {
  const deleteLikeQuery = {
    text:
      "\
            DELETE FROM likes WHERE user_id = $1 AND post_id = $2\
            ",
    values: [user_id, post_id],
  };
  const updatePostQuery = {
    text:
      "\
                UPDATE posts SET likes = likes - 1 WHERE post_id = $1",
    values: [post_id],
  };
  await pool.query(deleteLikeQuery);
  await pool.query(updatePostQuery);
  return;
};
