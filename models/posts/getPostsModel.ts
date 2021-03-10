import { pool } from "../../app";
export const getPostsModel = async (radius: number, user_id: number) => {
  const locationQuery = {
    text:
      "\
    SELECT p.* FROM user_account AS ua\
        INNER JOIN post AS p ON ua.user_id = p.user_id\
        LEFT JOIN follows AS f ON p.user_id = f.follower_user_id\
    WHERE cast(ua.latlng->'lat' AS int)\
        BETWEEN cast(ua.latlng->'lat' AS int) - $1\
        AND cast(ua.latlng->'lat' AS int) + $1\
    ",
    values: [radius],
  };
  const locationPosts = await pool.query(locationQuery);
  return locationPosts.rows;
};
