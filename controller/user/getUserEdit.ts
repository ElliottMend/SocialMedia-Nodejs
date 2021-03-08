import { Request, Response, NextFunction } from "express";
import { pool } from "../../app";
const getuserEdit = async (req: Request, res: Response, next: NextFunction) => {
  console.log(res.locals);
  const query = {
    text:
      "\
      SELECT ua.latlng, up.photo, ua.location, up.bio FROM user_account ua\
        INNER JOIN user_profile AS up ON ua.user_id = up.user_id\
          WHERE ua.user_id = $1",
    values: [res.locals.user],
  };
  const user = await pool.query(query);
  console.log(user.rows);
  res.send({
    bio: user.rows[0].bio,
    latlng: user.rows[0].latlng,
    image: user.rows[0].photo,
    location: user.rows[0].location,
  });
};
module.exports = getuserEdit;
