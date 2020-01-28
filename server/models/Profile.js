const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  about: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  experience: [
    {
      position: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      }
    }
  ],
  skills: [String],
  github: {
    type: String
  },
  website: {
    type: String
  },
  profilePicture: {
    type: String
  }
});
