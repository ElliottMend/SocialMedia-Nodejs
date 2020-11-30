require("dotenv").config();
const express = require("express"),
  router = express.Router(),
  User = require("./models/users"),
  Post = require("./models/posts"),
  Comment = require("./models/comments"),
  mongoose = require("mongoose"),
  Interaction = require("./models/interactions"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  { body, validationResult } = require("express-validator"),
  { register } = require("./controller/register");

mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
router.post("/register", register, async (req, res) => {});
router.put("/userEdit", async (req, res) => {
  if (req.body.bio) {
    await User.findOneAndUpdate(
      { username: req.body.user },
      { bio: req.body.bio }
    );
  }
  if (req.body.image) {
    await User.findOneAndUpdate(
      { username: req.body.user },
      { photo: req.body.image }
    );
  }
  if (req.body.location) {
    await User.findOneAndUpdate(
      { username: req.body.user },
      { location: req.body.location }
    );
  }
  if (req.body.latlng) {
    await User.findOneAndUpdate(
      { username: req.body.user },
      { latlng: req.body.latlng }
    );
  }
});
router.post("/checklike", async (req, res) => {
  const intID = await interactionID(req.body.user);
  res.json(intID.likes);
});
router.post("/locationPosts", async (req, res) => {
  let arr = [];
  arr.length = 0;
  const user = await findUser(req.body.user);
  const find = await User.find({
    "latlng.lat": {
      $gt: user[0].latlng.lat - req.body.radius,
      $lt: user[0].latlng.lat + req.body.radius,
    },
    "latlng.lng": {
      $gt: user[0].latlng.lng - req.body.radius,
      $lt: user[0].latlng.lng + req.body.radius,
    },
  });
  await Promise.all(
    find.map(async (e) => {
      const post = await Post.find({
        author: e.username,
        show: true,
      });
      if (!arr.includes(post)) {
        arr.push(...post);
      } else {
        return;
      }
    })
  );
  const intId = await interactionID(req.body.user);
  await Promise.all(
    intId.followingUsers.map(async (e) => {
      const post = await Post.find({
        author: e,
        show: true,
      });
      if (arr.length > 0) {
        post.forEach((e, index) => {
          if (e._id !== arr[index]._id) {
            if (post.length > 0) {
              return;
            } else {
              arr.push(post);
            }
          } else {
            return;
          }
        });
      } else {
        arr.push(...post);
      }
    })
  );
  res.send(arr);
});

router.put("/like", async (req, res) => {
  await Post.findByIdAndUpdate(req.body.id, { $inc: { likes: 1 } });
  const intID = await interactionID(req.body.user);
  await Interaction.findByIdAndUpdate(intID._id, {
    $push: { likes: req.body.id },
  });
  Post.findById(req.body.id, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.json(docs.likes);
    }
  });
});
router.post("/getUser", async (req, res) => {
  const user = await findUser(req.body.user);
  res.json(user[0]);
});
router.post("/createComment", async (req, res) => {
  const comm = new Comment({
    author: req.body.author,
    likes: req.body.likes,
    text: req.body.text,
    post: req.body.id,
    date: Date.now(),
  });
  await comm.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send(comm);
    }
  });
});
router.post("/getComments", async (req, res) => {
  req.body.posts.map((e) => {
    Comment.find({ post: e._id }, (err, re) => {
      try {
        res.send(re);
      } catch {
        if (err) {
          console.log(err);
        }
      }
    });
  });
});
router.put("/removePost", async (req, res) => {
  Post.findById(req.body.id, (err, re) => {
    (re.show = false),
      re.save((err) => {
        if (err) {
          console.log(err);
        }
      });
  });
});
router.put("/removeComment", async (req, res) => {
  Comment.findById(req.body.id, (err, user) => {
    if (user) {
      (user.show = false),
        user.save((err) => {
          if (err) {
            console.log(err);
          }
        });
    } else {
      return;
    }
  });
});
router.put("/unlike", async (req, res) => {
  const like = await Post.findById({ _id: req.body.id });
  if (like.likes <= 0) {
    Post.findByIdAndUpdate(req.body.id, { likes: 0 });
  } else {
    await Post.findByIdAndUpdate(req.body.id, { $inc: { likes: -1 } });
  }
  const intID = await interactionID(req.body.user);
  await Interaction.findByIdAndUpdate(
    intID._id,
    { $pull: { likes: req.body.id } },
    { multi: true }
  );
  Post.findById(req.body.id, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.json(docs.likes);
    }
  });
});
router.put("/addFollow", async (req, res) => {
  const userId = await interactionID(req.body.user);
  if (userId.followingUsers.includes(req.body.author)) {
    return;
  } else {
    userId.followingUsers.push(req.body.author);
  }
  await Interaction.findByIdAndUpdate(userId, {
    following: userId.followingUsers.length,
  });

  const authorId = await interactionID(req.body.author);
  if (authorId.followerUsers.includes(req.body.user)) {
    return;
  } else {
    authorId.followerUsers.push(req.body.user);
  }
  await Interaction.findByIdAndUpdate(authorId, {
    followers: authorId.followerUsers.length,
  });
  authorId.save();
  userId.save();
});
router.put("/removeFollow", async (req, res) => {
  const userId = await interactionID(req.body.user);
  if (userId.followingUsers.includes(req.body.author)) {
    userId.followingUsers.pull(req.body.author);
  }
  if (userId.following <= 0) {
    Interaction.findByIdAndUpdate(userId, { following: 0 });
  } else {
    await Interaction.findByIdAndUpdate(userId, {
      following: userId.followingUsers.length,
    });
  }

  const authorId = await interactionID(req.body.author);
  if (authorId.followerUsers.includes(req.body.user)) {
    authorId.followerUsers.pull(req.body.user);
  }
  if (authorId.followers <= 0) {
    Interaction.findByIdAndUpdate(authorId, { followers: 0 });
  } else {
    await Interaction.findByIdAndUpdate(authorId, {
      follower: authorId.followerUsers.length,
    });
  }

  authorId.save();
  userId.save();
});
router.post("/checkFollow", async (req, res) => {
  const userId = await interactionID(req.body.user);
  const ob = {
    followers: userId.followers,
    following: userId.following,
    followingUsers: userId.followingUsers,
    followerUsers: userId.followerUsers,
  };
  res.send(ob);
});
router.post("/newpost", async (req, res) => {
  const re = await findUser(req.body.username);
  const posts = new Post({
    author: req.body.username,
    location: re[0].location,
    body: req.body.body,
    date: Date.now(),
    img: req.body.img,
  });
  await posts.save((err) => {
    if (err !== null) {
      res.status(400).statusMessage("Body text is required");
    } else {
      res.json(posts);
    }
  });
});
router.post("/followData", async (req, res) => {
  let arr = [];
  if (req.body.followerUsers) {
    await Promise.all(
      req.body.followerUsers.map(async (e) => {
        const users = await findUser(e);
        users.map((i) => {
          arr.push({
            photo: i.photo,
            bio: i.bio,
            username: i.username,
          });
        });
      })
    );
  } else {
    await Promise.all(
      req.body.followingUsers.map(async (e) => {
        const users = await findUser(e);
        users.map((i) => {
          arr.push({
            photo: i.photo,
            bio: i.bio,
            username: i.username,
          });
        });
      })
    );
  }
  res.send(arr);
});
router.post("/follows", async (req, res) => {
  const follows = await Interaction.find({
    followerUsers: { $nin: [req.body.user] },
  }).limit(5);
  let arr = [];
  await Promise.all(
    follows.map(async (e) => {
      const user = await User.findById(e.user);
      if (user.username !== req.body.user) {
        arr.push({ bio: user.bio, username: user.username, photo: user.photo });
      }
    })
  );
  res.send(arr);
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res
        .status(400)
        .send({ message: "The email or password is incorrect" });
    }
    bcrypt.compare(req.body.password, user.password, (err, re) => {
      if (re) {
        const username = req.body.email;
        User.findOne(
          { email: new RegExp("^" + username + "$", "i") },
          (err, doc) => {
            let user = doc.username;
            let bio = doc.bio;
            const usr = { username: user };
            const accessToken = generateAccessToken(usr);
            const refreshToken = jwt.sign(usr, process.env.REFRESH_TOKEN, {
              expiresIn: "7d",
            });
            res.json({
              accessToken: accessToken,
              refreshToken: refreshToken,
              username: user,
              bio: bio,
            });
          }
        );
      } else {
        return res
          .status(400)
          .send({ message: "The email or password is incorrect" });
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post("/users/:id/", async (req, res) => {
  const user = await findUser(req.body.username);
  const posts = await Post.find({ author: req.body.username });
  if (user.length === 0) {
    res.status(400).send({ message: "This user does not exist" });
  } else {
    res.json(posts);
  }
});
router.post("/verify", async (req, res) => {
  const rtoken = req.body.refreshToken;
  const atoken = req.body.accessToken;
  const user = req.body.username;
  if (rtoken) {
    jwt.verify(atoken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        jwt.verify(rtoken, process.env.REFRESH_TOKEN, (err, val) => {
          const accessToken = generateAccessToken({ name: user.name });
          if (err) {
            res.sendStatus(401);
          } else {
            res.json({
              accessToken: accessToken,
              refreshToken: req.body.refreshToken,
            });
          }
        });
      } else {
        res.json({
          accessToken: req.body.accessToken,
          refreshToken: req.body.refreshToken,
        });
      }
    });
  } else {
    res.sendStatus(403);
  }
});
const interactionID = async (user) => {
  const userId = await findUser(user);
  const intId = await Interaction.find({ user: userId[0]._id });
  return intId[0];
};
const findUser = async (user) => {
  const users = await User.find({ username: user });
  return users;
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
};

module.exports = router;
