const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    profilePicture: {
      type: String
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users"
        }
      }
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users"
        },
        text: {
          type: String,
          required: true
        },
        name: {
          type: String
        },
        profilePicture: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now()
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("posts", PostSchema);

module.exports = Post;
