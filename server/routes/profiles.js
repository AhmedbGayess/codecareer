const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");

// Create profile
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
  console.log(profileObject);
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

module.exports = router;
