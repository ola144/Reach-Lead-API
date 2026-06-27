const SocialAccount = require("../models/Account");

exports.connectAccount = async (req, res) => {
  const account = await SocialAccount.create({
    ...req.body,
    owner: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: account,
  });
};

exports.getAccounts = async (req, res) => {
  const accounts = await SocialAccount.find({
    owner: req.user._id,
  });

  res.json({
    success: true,
    count: accounts.length,
    data: accounts,
  });
};

exports.getAccount = async (req, res) => {
  const account = await SocialAccount.findById(req.params.id);

  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  res.json({
    success: true,
    data: account,
  });
};

exports.disconnectAccount = async (req, res) => {
  const account = await SocialAccount.findByIdAndUpdate(
    req.params.id,
    {
      status: "disconnected",
    },
    {
      new: true,
    },
  );

  res.status(200).json({
    success: true,
    data: account,
  });
};

exports.deleteAccount = async (req, res) => {
  await SocialAccount.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Account removed",
  });
};

// Account Statistics
exports.accountStats = async (req, res) => {
  const stats = await SocialAccount.aggregate([
    {
      $match: {
        owner: req.user._id,
      },
    },
    {
      $group: {
        _id: "$platform",
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

// Account Health Montoring
exports.accountHealth = async (req, res) => {
  const connected = await SocialAccount.countDocuments({
    owner: req.user._id,
    status: "connected",
  });

  const expired = await SocialAccount.countDocuments({
    owner: req.user._id,
    status: "expired",
  });

  const disconnected = await SocialAccount.countDocuments({
    owner: req.user._id,
    status: "disconnected",
  });

  res.json({
    success: true,
    data: {
      connected,
      expired,
      disconnected,
    },
  });
};
