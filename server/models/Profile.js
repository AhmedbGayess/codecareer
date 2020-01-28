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
    type: String,
    validate(website) {
      const websiteRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      if (!websiteRegex.test(website)) {
        throw new Error("Invalid website URL");
      }
    }
  },
  profilePicture: {
    type: String
  }
});

const Profile = mongoose.model("profiles", ProfileSchema);

module.exports = Profile;
