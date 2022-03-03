const router = require("express").Router();
const {
  addQuestion,
  getQuestionById,
  deleteQuestion,
  getAllQuestions,
  updateQuestion,
} = require("../Controllers/question");
const { isAdmin, isAuthenticated, isSignedin } = require("../Controllers/auth");
const { getQuizById } = require("../Controllers/quiz");
const { getUserById } = require("../Controllers/user");

router.param("quizId", getQuizById);
router.param("questionId", getQuestionById);
router.param("userId", getUserById);

router.get(
  "/questions/:userId/:quizId",
  isSignedin,
  isAuthenticated,
  getAllQuestions
);

router.post(
  "/question/:userId/:quizId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  addQuestion
);

router.put(
  "/question/:userId/:quizId/:questionId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  updateQuestion
);

router.delete(
  "/question/:userId/:quizId/:questionId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  deleteQuestion
);

module.exports = router;
