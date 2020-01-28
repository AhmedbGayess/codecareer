const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Post = require("../models/Post");
const User = require("../models/User");
const Profile = require("../models/Profile");

// Create post
router.post("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    })
      .populate("user", ["name"])
      .select(
        "-skills -experience -about -education -github -location -website"
      );

    const post = new Post({
      user: req.user.id,
      name: profile.user.name,
      profilePicture: profile.profilePicture,
      body: req.body.body
    });

    await post.save();
    res.send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get posts
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .limit(10)
      .skip(parseInt(req.params.skip));
    res.send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
