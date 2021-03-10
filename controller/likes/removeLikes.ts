import { Request, Response } from "express";
import { pool } from "../../app";

export const removeLikes = async (req: Request, res: Response) => {
  const deleteLikeQuery = {
    text:
      "\
        DELETE FROM likes WHERE user_id = $1 AND post_id = $2\
        ",
    values: [res.locals.user, req.body.id],
  };
  const updatePostQuery = {
    text: "\
            UPDATE post SET likes = likes - 1 WHERE post_id = $1",
    values: [req.body.id],
  };
  try {
    await pool.query(deleteLikeQuery);
    await pool.query(updatePostQuery);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
