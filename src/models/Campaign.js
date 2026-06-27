const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    platform: {
      type: String,
      enum: ["linkedin", "twitter", "instagram", "facebook", "email"],
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "active", "paused", "completed"],
      default: "draft",
    },

    budget: {
      type: Number,
      default: 0,
    },

    targetLeads: {
      type: Number,
      default: 0,
    },

    generatedLeads: {
      type: Number,
      default: 0,
    },

    messagesSent: {
      type: Number,
      default: 0,
    },

    responseRate: {
      type: Number,
      default: 0,
    },

    startDate: Date,

    endDate: Date,

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Campaign", campaignSchema);
