const Lead = require("../models/Lead");
const Campaign = require("../models/Campaign");

exports.createLead = async (req, res) => {
  const lead = await Lead.create({
    ...req.body,
    owner: req.user._id,
  });

  if (lead.campaign) {
    await Campaign.findByIdAndUpdate(lead.campaign, {
      $inc: {
        generatedLeads: 1,
      },
    });
  }

  res.status(201).json({
    success: true,
    data: lead,
  });
};

exports.getLeads = async (req, res) => {
  const leads = await Lead.find({
    owner: req.user._id,
  })
    .populate("campaign", "name platform")
    .sort({
      createdAt: -1,
    });

  res.json({
    success: true,
    count: leads.length,
    data: leads,
  });
};

exports.getLead = async (req, res) => {
  const lead = await Lead.findById(req.params.id).populate(
    "campaign",
    "name platform",
  );

  if (!lead) {
    return res.status(404).json({
      message: "Lead not found",
    });
  }

  res.json({
    success: true,
    data: lead,
  });
};

exports.updateLead = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!lead) {
    return res.status(404).json({
      message: "Lead not found",
    });
  }

  res.json({
    success: true,
    data: lead,
  });
};

exports.deleteLead = async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return res.status(404).json({
      message: "Lead not found",
    });
  }

  await lead.deleteOne();

  res.json({
    success: true,
    message: "Lead deleted",
  });
};

// LEADS STATISTIC
exports.leadStats = async (req, res) => {
  const stats = await Lead.aggregate([
    {
      $match: {
        owner: req.user._id,
      },
    },
    {
      $group: {
        _id: "$status",
        count: {
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

// LEAD FUNNEL ENDPOINT
exports.pipelineStats = async (req, res) => {
  const data = await Lead.aggregate([
    {
      $match: {
        owner: req.user._id,
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
    data,
  });
};
