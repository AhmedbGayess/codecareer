const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const auth = require("../middleware/auth");
const User = require("../models/User");
const Profile = require("../models/Profile");

// Register user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const payload = {
      id: user._id,
      role: user.role,
      name: user.name
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 10800 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("Wrong email or password");
    }

    const isUser = await bcrypt.compare(password, user.password);

    if (!isUser) {
      return res.status(404).send("Wrong email or password");
    }

    const payload = {
      id: user._id,
      role: user.role,
      name: user.name
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 10800 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get own user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Edit user
router.patch("/", auth, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updates = {};

    if (name) {
      updates.name = name;
    }

    if (email) {
      updates.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      updates.password = newPassword;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    );

    await Profile.findOneAndUpdate({ user: req.user.id }, { $set: { name } });

    const payload = {
      id: user._id,
      role: user.role
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 10800 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
