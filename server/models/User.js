const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 280
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(email) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailRegex.test(email)) {
          throw new Error("Email is invalid");
        }
      }
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ["developer", "company"]
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
