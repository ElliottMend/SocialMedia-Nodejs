import { pool } from "../../connection";

export const getPostsModel = async (radius: number, userId: number) => {
  const locationQuery = {
    text:
      "\
    SELECT p.*, ua.location, ua.username, up.photo\
      FROM user_accounts AS ua\
      INNER JOIN posts AS p ON ua.user_id = p.user_id\
      LEFT JOIN user_profiles AS up ON p.user_id = up.user_id\
      LEFT JOIN follows AS f ON up.user_id = f.follower_user_id\
    WHERE cast(ua.latlng->'lat' AS int)\
        BETWEEN cast(ua.latlng->'lat' AS int) - $1\
        AND cast(ua.latlng->'lat' AS int) + $1\
    ",
    values: [radius],
  };
  const locationPosts = await pool.query(locationQuery);
  return locationPosts.rows;
};

export const newPostModel = async (body: string, userId: number) => {
  const insertQuery = {
    text: "INSERT INTO posts(body, user_id) VALUES($1, $2) RETURNING *",
    values: [body, userId],
  };
  const query = await pool.query(insertQuery);
  return query.rows[0];
};

export const removePostModel = async (postId: number) => {
  const deleteQuery = {
    text: "DELETE FROM posts WHERE posts.post_id = $1",
    values: [postId],
  };
  await pool.query(deleteQuery);
};