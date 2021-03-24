import { pool } from "../connection";
export const removeLikesModel = async (userId: number, postId: number) => {
  const deleteLikeQuery = {
    text:
      "\
            DELETE FROM likes WHERE user_id = $1 AND post_id = $2\
            ",
    values: [userId, postId],
  };
  const updatePostQuery = {
    text:
      "\
                UPDATE posts SET likes = likes - 1 WHERE post_id = $1",
    values: [postId],
  };
  await pool.query(deleteLikeQuery);
  await pool.query(updatePostQuery);
  return;
};
