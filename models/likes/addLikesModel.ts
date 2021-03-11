import { pool } from "../../app";
export const addLikesModel = async (user_id: number, post_id: number) => {
  const insertLikeQuery = {
    text: "\
        INSERT INTO likes(user_id, post_id) VALUES($1,$2)\
    ",
    values: [user_id, post_id],
  };
  const updatePostQuery = {
    text: "\
        UPDATE post SET likes = likes + 1 WHERE post_id = $1\
    ",
    values: [post_id],
  };
  await pool.query(insertLikeQuery);
  await pool.query(updatePostQuery);
  return;
};
