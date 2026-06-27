const Outreach = require("../models/Outreach");

const Campaign = require("../models/Campaign");

exports.createOutreach = async (req, res) => {
  const outreach = await Outreach.create({
    ...req.body,
    sender: req.user._id,
  });

  await Campaign.findByIdAndUpdate(outreach.campaign, {
    $inc: {
      messagesSent: 1,
    },
  });

  res.status(201).json({
    success: true,
    data: outreach,
  });
};

exports.getOutreachHistory = async (req, res) => {
  const messages = await Outreach.find({
    sender: req.user._id,
  })
    .populate("lead", "firstName lastName email")
    .populate("campaign", "name")
    .sort({
      createdAt: -1,
    });

  res.json({
    success: true,
    count: messages.length,
    data: messages,
  });
};

exports.updateStatus = async (req, res) => {
  const outreach = await Outreach.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json({
    success: true,
    data: outreach,
  });
};

//   Outreach Analytics
exports.outreachStats = async (req, res) => {
  const stats = await Outreach.aggregate([
    {
      $match: {
        sender: req.user._id,
      },
    },
    {
      $group: {
        _id: "$status",
        total: {
          $sum: 1,
        },
      },
    },
  ]);

  res.json({
    success: true,
    data: stats,
  });
};
