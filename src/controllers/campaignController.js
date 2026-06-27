const Campaign = require("../models/Campaign");

exports.createCampaign = async (req, res) => {
  const campaign = await Campaign.create({
    ...req.body,
    owner: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: campaign,
  });
};

exports.getCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({
    owner: req.user._id,
  }).sort({
    createdAt: -1,
  });

  res.json({
    success: true,
    count: campaigns.length,
    data: campaigns,
  });
};

exports.getCampaign = async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    return res.status(404).json({
      message: "Campaign not found",
    });
  }

  res.json({
    success: true,
    data: campaign,
  });
};

exports.updateCampaign = async (req, res) => {
  const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!campaign) {
    return res.status(404).json({
      message: "Campaign not found",
    });
  }

  res.json({
    success: true,
    data: campaign,
  });
};

exports.deleteCampaign = async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    return res.status(404).json({
      message: "Campaign not found",
    });
  }

  await campaign.deleteOne();

  res.json({
    success: true,
    message: "Campaign deleted",
  });
};

exports.dashboardMetrics = async (req, res) => {
  const campaigns = await Campaign.find({
    owner: req.user._id,
  });

  const totalCampaigns = campaigns.length;

  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;

  const totalLeads = campaigns.reduce((sum, c) => sum + c.generatedLeads, 0);

  const totalMessages = campaigns.reduce((sum, c) => sum + c.messagesSent, 0);

  res.json({
    totalCampaigns,
    activeCampaigns,
    totalLeads,
    totalMessages,
  });
};
