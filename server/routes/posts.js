const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Post = require("../models/Post");
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
      text: req.body.text
    });

    await post.save();
    res.send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    await post.remove();
    res.send("Post removed");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get posts
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .limit(10)
      .skip(parseInt(req.params.skip));
    res.send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get user's post
router.get("/:id", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id })
      .limit(10)
      .skip(parseInt(req.params.skip));
    res.send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Like/ Unlike post
router.patch("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    const liked = post.likes.find((like) => like.id.toString() === req.user.id);

    if (liked) {
      const newLikes = post.likes.filter(
        (like) => like.id.toString() !== req.user.id
      );
      post.likes = newLikes;
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    res.send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add comment
router.post("/comment/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    })
      .populate("user", ["name"])
      .select(
        "-skills -experience -about -education -github -location -website"
      );

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("No post found");
    }

    if (!req.body.text) {
      return res.status(400).send("Comment text is required");
    }

    const comment = {
      user: req.user.id,
      name: profile.user.name,
      profilePicture: profile.profilePicture,
      text: req.body.text
    };

    post.comments.unshift(comment);
    await post.save();
    res.send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Remove comment from post
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).send("No post found");
    }

    const commentToDelete = post.comments.find(
      (comm) => comm._id.toString() === req.params.comment_id
    );

    if (!commentToDelete) {
      return res.status(404).send("No comment found");
    }

    if (
      commentToDelete.user.toString() !== req.user.id &&
      post.user.toString() !== req.user.id
    ) {
      return res.status(401).send("Unauthorized");
    }

    const filteredComments = post.comments.filter(
      (comment) => comment._id.toString() !== commentToDelete._id.toString()
    );

    post.comments = filteredComments;

    await post.save();
    res.send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
