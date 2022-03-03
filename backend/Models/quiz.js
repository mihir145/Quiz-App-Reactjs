const mongoose = require("mongoose");

var quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 80,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
