import { Response } from "express";
import { pool } from "../../app";
export const userProfileModel = async (username: string, res: Response) => {
  const profileQuery = {
    text:
      "\
      SELECT up.*  \
      FROM user_account AS ua\
      INNER JOIN user_profile AS up ON ua.user_id = up.user_id\
      WHERE ua.username = $1\
      ",
    values: [username],
  };
  const postQuery = {
    text:
      "\
        SELECT p.*  \
        FROM user_account AS ua\
        INNER JOIN post AS p ON ua.user_id = p.user_id\
        WHERE ua.username = $1\
        ",
    values: [username],
  };
  const likesQuery = {
    text:
      "\
        SELECT l.*  \
        FROM user_account AS ua\
        INNER JOIN likes AS l ON ua.user_id = l.user_id\
        WHERE ua.username = $1\
        ",
    values: [username],
  };
  const followQuery = {
    text:
      "\
        SELECT f.*  \
        FROM user_account AS ua\
        INNER JOIN follows AS f ON ua.user_id = f.follower_user_id\
            OR ua.user_id = f.following_user_id\
        WHERE ua.username = $1\
        ",
    values: [username],
  };
  const profile = await pool.query(profileQuery);
  const posts = await pool.query(postQuery);
  const likes = await pool.query(likesQuery);
  const follows = await pool.query(followQuery);
  const data = {
    user_profile: profile.rows,
    likes: likes.rows,
    follows: follows.rows,
    post: posts.rows,
  };
  return data;
};
