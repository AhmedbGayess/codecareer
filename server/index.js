const express = require("express");
const connectDB = require("./db/mongoose");

const users = require("./routes/users");
const profiles = require("./routes/profiles");

const app = express();
connectDB();

app.use(express.json());

app.use("/api/users", users);
app.use("/api/profiles", profiles);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
