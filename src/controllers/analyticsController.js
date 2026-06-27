const Campaign = require("../models/Campaign");
const Lead = require("../models/Lead");
const Outreach = require("../models/Outreach");
const Account = require("../models/Account");

exports.getDashboardAnalytics = async (req, res) => {
  const userId = req.user._id;

  const [
    totalCampaigns,
    totalLeads,
    activeCampaigns,
    totalMessages,
    repliedMessages,
    wonLeads,
    connectedAccounts,
  ] = await Promise.all([
    Campaign.countDocuments({
      owner: userId,
    }),

    Lead.countDocuments({
      owner: userId,
    }),

    Campaign.countDocuments({
      owner: userId,
      status: "active",
    }),

    Outreach.countDocuments({
      sender: userId,
    }),

    Outreach.countDocuments({
      sender: userId,
      status: "replied",
    }),

    Lead.countDocuments({
      owner: userId,
      status: "won",
    }),

    Account.countDocuments({
      owner: userId,
      status: "connected",
    }),
  ]);

  const responseRate =
    totalMessages > 0
      ? ((repliedMessages / totalMessages) * 100).toFixed(1)
      : 0;

  const conversionRate =
    totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : 0;

  res.json({
    success: true,
    data: {
      totalCampaigns,
      totalLeads,
      activeCampaigns,
      totalMessages,
      responseRate,
      conversionRate,
      connectedAccounts,
    },
  });
};

//Monthly Campaign Performance
exports.monthlyPerformance = async (req, res) => {
  const stats = await Campaign.aggregate([
    {
      $match: {
        owner: req.user._id,
      },
    },

    {
      $group: {
        _id: {
          month: {
            $month: "$createdAt",
          },
        },

        campaigns: {
          $sum: 1,
        },

        leads: {
          $sum: "$generatedLeads",
        },

        messages: {
          $sum: "$messagesSent",
        },
      },
    },

    {
      $sort: {
        "_id.month": 1,
      },
    },
  ]);

  res.json({
    success: true,
    data: stats,
  });
};

//Platform Analytics
exports.platformBreakdown = async (req, res) => {
  const stats = await Campaign.aggregate([
    {
      $match: {
        owner: req.user._id,
      },
    },

    {
      $group: {
        _id: "$platform",

        campaigns: {
          $sum: 1,
        },

        leads: {
          $sum: "$generatedLeads",
        },

        messages: {
          $sum: "$messagesSent",
        },
      },
    },

    {
      $sort: {
        campaigns: -1,
      },
    },
  ]);

  res.json({
    success: true,
    data: stats,
  });
};

// Lead Pipeline Analytics
exports.pipelineAnalytics = async (req, res) => {
  const pipeline = await Lead.aggregate([
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
    data: pipeline,
  });
};

//Top Campaigns
exports.topCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({
    owner: req.user._id,
  })
    .sort({
      generatedLeads: -1,
    })
    .limit(10)
    .select("name generatedLeads messagesSent responseRate status");

  res.json({
    success: true,
    data: campaigns,
  });
};

// Outreach Analytics
exports.outreachAnalytics = async (req, res) => {
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
