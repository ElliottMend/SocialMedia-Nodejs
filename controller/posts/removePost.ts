import { Request, Response } from "express";
import { pool } from "../../app";
export const removePost = async (req: Request, res: Response) => {
  try {
    const deleteQuery = {
      text: "DELETE FROM post WHERE post.post_id = $1",
      values: [req.body.id],
    };
    await pool.query(deleteQuery);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};
