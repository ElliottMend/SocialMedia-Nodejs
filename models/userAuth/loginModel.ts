import { Response } from "express";
import { pool } from "../../app";
import { IQuery } from "./registerModel";

export const loginModel = async (email: string, res: Response) => {
  const selectQuery = {
    text: "SELECT user_id, password, email FROM user_account WHERE email = $1",
    values: [email],
  };
  const result = await pool.query(selectQuery);
  if (result.rows.length > 0) {
    return result.rows[0];
  } else {
    res.sendStatus(400);
  }
};
