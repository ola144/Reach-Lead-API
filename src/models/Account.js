const mongoose = require("mongoose");

const socialAccountSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    platform: {
      type: String,
      enum: ["linkedin", "twitter", "instagram", "facebook", "email"],
      required: true,
    },

    accountName: {
      type: String,
      required: true,
    },

    accountId: {
      type: String,
      required: true,
    },

    accessToken: {
      type: String,
      default: null,
    },

    refreshToken: {
      type: String,
      default: null,
    },

    tokenExpiresAt: Date,

    status: {
      type: String,
      enum: ["connected", "disconnected", "expired"],
      default: "connected",
    },

    lastSyncedAt: Date,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SocialAccount", socialAccountSchema);
