import { Request, Response, NextFunction, query } from "express";
import { pool } from "../../app";
const Post = require("../../models/posts");
const removePost = async (req: Request, res: Response, next: NextFunction) => {
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
module.exports = removePost;
