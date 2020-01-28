const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Job = require("../models/Job");
const Profile = require("../models/Profile");

// Add job offer
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "company") {
    return res.status(401).send("Unauthorized");
  }

  const { title, description, skills } = req.body;

  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .select("-skills -experience -about -education -github -website");

    if (!profile) {
      return res.status(401).send("Profile needed to post a job");
    }

    const job = new Job({
      user: req.user.id,
      company: profile.user.name,
      title,
      location: profile.location,
      description,
      skills
    });

    await job.save();
    res.send(job);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Apply to job
router.post("/apply/:id", auth, async (req, res) => {
  if (req.user.role !== "developer") {
    return res.status(401).send("Unauthorized");
  }

  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).send("Job not found");
    }

    const profile = await Profile.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .select("-experience -about -education -github -website");

    if (!profile) {
      return res.status(401).send("Profile needed to post a job");
    }

    const applied = job.applicants.find(
      (applicant) => applicant.user.toString() === req.user.id
    );

    if (applied) {
      return res.send("Already applied");
    }

    job.applicants.unshift({
      user: req.user.id,
      name: profile.user.name,
      profilePicture: profile.profilePicture,
      skills: profile.skills
    });

    await job.save();
    res.send(job);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all jobs
router.get("/", auth, async (req, res) => {
  try {
    const jobs = await Job.find()
      .limit(10)
      .skip(parseInt(req.params.skip))
      .select("-applicants");
    res.send(jobs);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get job by id
router.get("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).send("No job found");
    }
    res.send(job);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Edit job
router.patch("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!job) {
      return res.status(400).send();
    }
    res.send(job);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete job
router.delete("/:id", auth, async (req, res) => {
  try {
    await Job.findOneAndRemove({ _id: req.params.id, user: req.user.id });
    res.send("Job deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
