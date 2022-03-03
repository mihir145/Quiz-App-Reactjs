const Question = require("../Models/question");

exports.getQuestionById = (req, res, next, id) => {
  Question.findById(id)
    .populate("quiz")
    .exec((err, question) => {
      if (err) {
        return res.status(400).json({
          error: "Question Not Found.",
        });
      }
      req.question = question;
      next();
    });
};

exports.getAllQuestions = (req, res) => {
  const { _id } = req.quiz;
  Question.find({ quiz: _id }).exec((err, questions) => {
    if (err) {
      return res.status(400).json({
        error: "No Questions Found.",
      });
    }
    return res.status(200).json(questions);
  });
};

exports.addQuestion = (req, res) => {
  const { correct_index, options, question } = req.body;

  if (question == "") {
    return res.status(422).json({
      error: "Question can not be empty!",
    });
  }

  if (options.length !== 4 || options.includes("")) {
    return res.status(422).json({
      error: "Include all 4 options!",
    });
  }

  if (correct_index === -1) {
    return res.status(422).json({
      error: "Please Select any one correct option!",
    });
  }

  if (correct_index >= options.length) {
    return res.status(422).json({
      error: "Please Select any one correct option from these options only!",
    });
  }

  var quest = new Question(req.body);
  quest.save((err, question) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    return res.send(question);
  });
};

exports.updateQuestion = (req, res) => {
  // console.log(req.question);
  // console.log(req.body);
  // Question.updateOne(
  //   { _id: req.question._id },
  //   { $set: req.body },
  //   (err, question) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: "Unable To Delete Question!",
  //       });
  //     }
  //     return res.status(200).json({
  //       message: "Successfully Updated!",
  //       question,
  //     });
  //   }
  // );
  Question.findByIdAndUpdate(
    { _id: req.question._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, question) => {
      if (err) {
        return res.status(400).json({
          error: "Unable To Delete Question!",
        });
      }
      return res.status(200).json({
        message: "Successfully Updated!",
        question,
      });
    }
  );
};

exports.deleteQuestion = (req, res) => {
  let question = req.question;
  question.remove((err, deletedQuest) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the question.",
      });
    }

    return res.json({
      message: "Deletion was a success.",
      deletedQuest,
    });
  });
};
