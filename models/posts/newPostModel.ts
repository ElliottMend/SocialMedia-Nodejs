import { Response } from "express";
import { pool } from "../../app";
export const newPostModel = async (
  body: string,
  user_id: string,
  res: Response
) => {
  const insertQuery = {
    text: "INSERT INTO post(body, user_id) VALUES($1,$2) RETURNING *",
    values: [body, user_id],
  };
  const query = await pool.query(insertQuery);
  if (query) {
    return query.rows[0];
  } else {
    res.sendStatus(400);
  }
};
