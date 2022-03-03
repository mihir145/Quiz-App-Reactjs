const Activity = require("../Models/activity");

exports.saveActivity = (req, res) => {
  const activity = new Activity(req.body);
  activity.save((err, activity) => {
    if (err) {
      return res.status(400).json({
        error: "Something Went Wrong!",
      });
    }
    return res.status(200).json(activity);
  });
};

exports.getActivity = (req, res) => {
  Activity.findOne({ user: req.profile._id, quiz: req.quiz._id })
    .populate({ path: "questions", select: "quiz" })
    .exec((err, activity) => {
      if (err) {
        return res.status(400).json({
          error: "Not Found!!",
        });
      }
      return res.status(200).json(activity);
    });
};

exports.getActivities = (req, res) => {
  Activity.find({ user: req.profile._id }, (err, activity) => {
    if (err) {
      return res.status(400).json({
        error: "Not Found Activities!!",
      });
    }
    return res.status(200).json(activity);
  });
};
