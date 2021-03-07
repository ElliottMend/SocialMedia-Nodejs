import { Request, Response, NextFunction } from "express";
const bcrypt = require("bcrypt"),
  Interaction = require("../../models/interactions"),
  pool = require("../../app");
const register = async (req: Request, res: Response, next: NextFunction) => {
  const password = await bcrypt.hash(req.body.password, 10);
  const query = "INSERT INTO user_account(username, password, email)";
  const values = [req.body.username, password, req.body.email.trim()];
  pool.query(query, values, (err: any, res: any) => {
    if (err) {
      console.log(typeof err);
      console.log(err);
    } else {
      console.log(typeof res);
      console.log(res.rows[0]);
    }
  });
};
module.exports = register;
