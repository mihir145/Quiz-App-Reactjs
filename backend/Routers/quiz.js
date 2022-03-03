const router = require("express").Router();
const { isAdmin, isAuthenticated, isSignedin } = require("../Controllers/auth");
const { getUserById } = require("../Controllers/user");
const {
  getQuizById,
  createQuiz,
  quizphoto,
  updateQuiz,
  deleteQuiz,
  getAllQuiz,
  getOne,
} = require("../Controllers/quiz");

router.param("quizId", getQuizById);
router.param("userId", getUserById);

router.post(
  "/quiz/create/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  createQuiz
);

router.get("/quiz/photo/:quizId", quizphoto);

router.get("/quiz/getAll", getAllQuiz);

router.get("/quiz/getOne/:quizId", getOne);

router.put(
  "/quiz/:userId/:quizId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  updateQuiz
);

router.delete(
  "/quiz/:userId/:quizId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  deleteQuiz
);

module.exports = router;
