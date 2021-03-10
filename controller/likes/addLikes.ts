import { Request, Response } from "express";
import { pool } from "../../app";
export const addLikes = async (req: Request, res: Response) => {
  const insertLikeQuery = {
    text: "\
        INSERT INTO likes(user_id, post_id) VALUES($1,$2)\
        ",
    values: [res.locals.user, req.body.id],
  };
  const updatePostQuery = {
    text: "\
        UPDATE post SET likes = likes + 1 WHERE post_id = $1",
    values: [req.body.id],
  };
  try {
    await pool.query(insertLikeQuery);
    await pool.query(updatePostQuery);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
