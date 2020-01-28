const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");

// Create and update profile
router.post("/", auth, async (req, res) => {
  const {
    about,
    location,
    experience,
    education,
    skills,
    github,
    website,
    profilePicture
  } = req.body;

  const profileObject = {};
  profileObject.user = req.user.id;
  profileObject.about = about;
  profileObject.location = location;
  if (website) {
    profileObject.website = website;
  }
  if (profilePicture) {
    profileObject.profilePicture = profilePicture;
  }
  if (req.user.role === "developer") {
    if (experience) {
      profileObject.experience = experience;
    }
    if (education) {
      profileObject.education = education;
    }
    if (skills) {
      profileObject.skills = skills;
    }
    if (github) {
      profileObject.github = github;
    }
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileObject },
        { new: true }
      );
      return res.send(profile);
    }

    profile = new Profile(profileObject);
    await profile.save();
    res.send(profile);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all profiles
router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate("user", ["name", "email", "role"])
      .limit(10)
      .skip(parseInt(req.query.skip));

    res.send(profiles);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get own profile
router.get("/my-profile", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "email", "role"]);

    if (!profile) {
      return res.status(404).send("You still do not have a profile");
    }

    res.send(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get profile by user id
router.get("/user/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id
    }).populate("user", ["name", "email", "role"]);

    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    res.send(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete user and profile
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findByIdAndRemove(req.user.id);

    res.send("User and profile deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
