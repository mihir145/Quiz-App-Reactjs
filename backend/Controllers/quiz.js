const Quiz = require("../Models/quiz");
const Quest = require("../Models/question");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getQuizById = (req, res, next, id) => {
  Quiz.findById(id).exec((err, quiz) => {
    if (err) {
      return res.status(400).json({
        error: "No Quiz Found.",
      });
    }
    req.quiz = quiz;
    next();
  });
};

exports.getOne = (req, res) => {
  req.quiz.photo = undefined;
  return res.json(req.quiz);
};

exports.getAllQuiz = (req, res) => {
  // let limit = req.query.limit ? parseInt(req.query.limit) : 8;.limit(limit)
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Quiz.find({})
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .exec((err, quiz) => {
      if (err) {
        return res.status(400).json({
          error: "No Quizzes Found.",
        });
      }

      return res.json(quiz);
    });
};

exports.createQuiz = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtention = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Problem With Image.",
        msg: err,
      });
    }
    //destructuring Fields
    const { title, description } = fields;

    if (!title || !description) {
      return res.status(400).json({
        error: "Please Include All Fields.",
      });
    }
    const quiz = new Quiz(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File Size Too Big!",
        });
      }
      // return res.send(quiz);
      quiz.photo.data = fs.readFileSync(file.photo.path);
      quiz.photo.contentType = file.photo.type;
    }
    quiz.save((err, quiz) => {
      if (err) {
        return res.status(400).json({
          error: "Quiz Not Created Please Try Again",
        });
      }
      return res.json(quiz);
    });
  });
};

exports.quizphoto = (req, res, next) => {
  if (req.quiz.photo.data) {
    res.set("Content-Type", req.quiz.photo.contentType);
    return res.send(req.quiz.photo.data);
  }
  next();
};

exports.updateQuiz = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem With Image.",
      });
    }

    //TODO: restriction on field
    let quiz = req.quiz;
    quiz = _.extend(quiz, fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File Size too big!",
        });
      }
      quiz.photo.data = fs.readFileSync(file.photo.path);
      quiz.photo.contentType = file.photo.type;
    }

    //save to the DB
    quiz.save((err, quiz) => {
      if (err) {
        return res.status(400).json({
          error: "Updation of Quiz Failed.",
        });
      }
      return res.json(quiz);
    });
  });
};

exports.deleteQuiz = (req, res) => {
  let quiz = req.quiz;

  Quest.remove({ quiz: req.quiz._id }, (err, deletedQuestions) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the questions.",
      });
    }
    Quiz.findByIdAndRemove({ _id: req.quiz._id }, (err, deletedQuiz) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete the quiz.",
        });
      }

      res.json({
        message: "Deletion was success.",
        deletedQuiz,
        deletedQuestions,
      });
    });
  });
};
