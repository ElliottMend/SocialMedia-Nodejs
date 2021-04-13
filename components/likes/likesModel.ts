import { pool } from "../../connection";
export const addLikesModel = async (userId: number, postId: number) => {
  const insertLikeQuery = {
    text: "\
        INSERT INTO likes(user_id, post_id) VALUES($1,$2)\
    ",
    values: [userId, postId],
  };
  const updatePostQuery = {
    text: "\
        UPDATE posts SET likes = likes + 1 WHERE post_id = $1\
    ",
    values: [postId],
  };
  await pool.query(insertLikeQuery);
  await pool.query(updatePostQuery);
  return;
};

export const checkLikedModel = async (userId: number, postId: number) => {
  const selectQuery = {
    text:
      "\
        SELECT * FROM likes WHERE user_id = $1 AND post_id = $2\
        ",
    values: [userId, postId],
  };
  const data = await pool.query(selectQuery);
  return data.rows;
};

export const removeLikesModel = async (userId: number, postId: number) => {
  const deleteLikeQuery = {
    text: "\
      DELETE FROM likes WHERE user_id = $1 AND post_id = $2\
      ",
    values: [userId, postId],
  };
  const updatePostQuery = {
    text: "\
        UPDATE posts SET likes = likes - 1 WHERE post_id = $1",
    values: [postId],
  };
  await pool.query(deleteLikeQuery);
  await pool.query(updatePostQuery);
  return;
};
