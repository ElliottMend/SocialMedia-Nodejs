import { Request, Response, NextFunction } from "express";
import { pool } from "../../app";

const findUsername = require("../findUsername"),
  Post = require("../../models/posts"),
  interactionId = require("../interactionId"),
  Comments = require("../../models/comments");
const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let postArray: any[] = [];
  const query =
    "\
    SELECT * FROM user_account ua\
    RIGHT JOIN post p ON ua.user_id = p.user_id\
    RIGHT JOIN user_profile up ON ua.user_id = up.user_id\
    RIGHT JOIN likes l ON ua.user_id = l.user_id\
    RIGHT JOIN follows f ON f.follower_user_id = ua.user_id\
    WHERE ua.username = $1\
    ";
  const values = [req.params.username];
  pool.query(query, values, (err: Error, result) => {});
  const user = await findUsername(req.params.username);
  postArray = await Post.find({
    author: req.params.username,
    show: true,
  });
  const interaction = await interactionId(req.params.username);
  let likeArray = [];
  let arr = [...interaction.comments];
  const mapLikes = interaction.likes.map(async (e) => {
    const posts = await Post.findById(e);
    likeArray.push(posts);
  });
  Promise.all(mapLikes).then(async () => {
    let commentArray = [];
    const comments = await Post.find({
      comments: { $in: arr },
      show: true,
    });
    if (!commentArray.includes(comments)) {
      commentArray.push(...comments);
    } else {
      return;
    }

    if (!req.params.username) {
      res.status(400).send({ message: "This user does not exist" });
    } else {
      postArray = postArray.sort((a, b) => (a.date < b.date ? 1 : -1));
      res.status(200).send({
        bio: user.bio,
        photo: user.photo,
        location: user.location,
        posts: postArray,
        likes: likeArray,
        comments: commentArray,
      });
    }
  });
};
module.exports = getUserProfile;
