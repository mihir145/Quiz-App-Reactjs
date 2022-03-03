const router = require("express").Router();
const { isSignedin, isAuthenticated } = require("../Controllers/auth");
const { getUserById } = require("../Controllers/user");
const { getQuizById } = require("../Controllers/quiz");
const {
  saveActivity,
  getActivity,
  getActivities,
} = require("../Controllers/activity");

router.param("userId", getUserById);
router.param("quizId", getQuizById);

router.post(
  "/activity/:userId/:quizId",
  isSignedin,
  isAuthenticated,
  saveActivity
);

router.get(
  "/activity/:userId/:quizId",
  isSignedin,
  isAuthenticated,
  getActivity
);

router.get("/activities/:userId", isSignedin, isAuthenticated, getActivities);

module.exports = router;
