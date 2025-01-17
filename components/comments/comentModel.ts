import { pool } from "../../connection";

export const createCommentModel = async (
  text: string,
  userId: number,
  postId: number
) => {
  const insertCommentQuery = {
    text:
      "\
        INSERT INTO comments(body,user_id,post_id) VALUES ($1,$2,$3) RETURNING *\
        ",
    values: [text, userId, postId],
  };
  return (await pool.query(insertCommentQuery)).rows;
};

export const getCommentModel = async (postId: number) => {
  const selectQuery = {
    text:
      "\
        SELECT c.*, ua.location, ua.username, up.photo\
        FROM comments AS c\
        INNER JOIN user_accounts AS ua ON c.user_id = ua.user_id\
        INNER JOIN user_profiles AS up ON ua.user_id = up.user_id\
        WHERE c.post_id = $1\
      ",
    values: [postId],
  };
  return await (await pool.query(selectQuery)).rows;
};

export const checkUserCommentModel = async (
  userId: number,
  commentId: number
) => {
  const selectQuery = {
    text:
      "\
        SELECT * FROM comments WHERE user_id = $1 AND comment_id = $2\
        ",
    values: [userId, commentId],
  };
  return (await pool.query(selectQuery)).rows;
};

export const removeCommentModel = async (commentId: number) => {
  const deleteQuery = {
    text: "\
        DELETE FROM comments WHERE comment_id = $1 \
        ",
    values: [commentId],
  };
  return (await pool.query(deleteQuery)).rows;
};
