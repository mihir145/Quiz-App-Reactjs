const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var questSchema = new mongoose.Schema(
  {
    quiz: {
      type: ObjectId,
      ref: "Quiz",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      require: true,
    },
    correct_index: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Quest", questSchema);
