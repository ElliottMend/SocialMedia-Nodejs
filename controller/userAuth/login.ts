import { Request, Response, NextFunction } from "express";
import { pool } from "../../app";

const bcrypt = require("bcrypt"),
  generateAccessToken = require("./generateAccessToken");
const login = async (req: Request, res: Response, next: NextFunction) => {
  const query =
    "SELECT username, password, email FROM user_account WHERE username = $1";
  const values = [req.body.username];

  pool.query(query, values, (err: Error, poolResponse: any) => {
    if (err) {
      return;
    } else {
      bcrypt.compare(
        req.body.password,
        poolResponse.rows[0].password,
        (error: Error, bcryptResult: unknown) => {
          if (bcryptResult) {
            const [
              accessToken,
              refreshToken,
              accessCookie,
              refreshCookie,
            ] = generateAccessToken(
              poolResponse.rows[0].username,
              poolResponse.rows[0].email
            );
            res.cookie("AccessToken", accessToken, accessCookie);
            res.cookie("RefreshToken", refreshToken, refreshCookie);
            res.status(200).send();
          }
        }
      );
    }
  });
};
module.exports = login;
