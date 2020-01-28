const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    company: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    skills: {
      type: [String],
      required: true
    },
    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "profile",
          required: true
        },
        name: {
          type: String,
          required: true
        },
        skills: {
          type: [String],
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Job = mongoose.model("jobs", JobSchema);

module.exports = Job;
