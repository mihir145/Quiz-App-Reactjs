const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    quiz: {
      type: ObjectId,
      ref: "Quiz",
    },
    questions: [
      {
        type: ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
