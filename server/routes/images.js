const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Jimp = require("jimp");
const uuidv4 = require("uuid");
const Image = require("../models/Image");
const Profile = require("../models/Profile");
const auth = require("../middleware/auth");

const router = new express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single("image");

// Add profile image
router.post("/", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({ err });
    } else {
      if (req.file == undefined) {
        res.json({ msg: "Error: No File Selected!" });
      } else {
        Jimp.read(`./uploads/${req.file.filename}`, async (err, img) => {
          if (err) throw err;
          const image = `image-${uuidv4()}.jpeg`;
          img
            .cover(350, 350)
            .quality(90)
            .write(`./uploads/${image}`);
          fs.unlinkSync(`./uploads/${req.file.filename}`);
          const savedImage = new Image({
            image,
            user: req.user.id
          });
          savedImage.save();
          res.send(savedImage);
        });
      }
    }
  });
});

// Delete profile image
router.delete("/:image", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).send("No profile found");
    }

    const image = await Image.findOne({
      image: req.params.image,
      user: req.user.id
    });

    if (!image) {
      return res.status(404).send();
    }
    await image.remove();
    fs.unlinkSync(`./uploads/${req.params.image}`);
    profile.profilePicture = "";
    profile.save();
    res.send("Image deleted");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
