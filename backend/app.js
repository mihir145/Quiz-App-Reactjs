const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const morgan = require("morgan");

//routes
const authRoutes = require("./Routers/auth");
const quizRoutes = require("./Routers/quiz");
const userRoutes = require("./Routers/user");
const questionRoutes = require("./Routers/question");
const activityRoutes = require("./Routers/activity");

const app = express();

//connection to database
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(console.log("Database Connected."));

//middlewares
app.use(xss());
app.use(mongoSanitize());
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", quizRoutes);
app.use("/api", questionRoutes);
app.use("/api", activityRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running At PORT:${process.env.PORT}`);
});
