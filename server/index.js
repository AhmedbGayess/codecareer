const express = require("express");
const connectDB = require("./db/mongoose");

const users = require("./routes/users");
const profiles = require("./routes/profiles");
const posts = require("./routes/posts");
const jobs = require("./routes/jobs");
const images = require("./routes/images");

const app = express();
connectDB();

app.use(express.json());

app.use("/images", express.static("./uploads"));

app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);
app.use("/api/jobs", jobs);
app.use("/api/images", images);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
