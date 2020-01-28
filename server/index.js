const express = require("express");
const connectDB = require("./db/mongoose");

const users = require("./routes/users");
const profiles = require("./routes/profiles");
const posts = require("./routes/posts");
const jobs = require("./routes/jobs");

const app = express();
connectDB();

app.use(express.json());

app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);
app.use("/api/jobs", jobs);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
