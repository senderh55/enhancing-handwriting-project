const express = require("express");

const userRouter = require("./routes/userRoutes");
const profileRouter = require("./routes/profileRoutes");
const cors = require("cors");
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming request bodies as JSON
app.use(express.json());

app.use(userRouter);
app.use(profileRouter);

module.exports = app;
