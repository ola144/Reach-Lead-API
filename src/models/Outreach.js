const mongoose = require("mongoose");

const outreachSchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },

    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    platform: {
      type: String,
      enum: ["linkedin", "twitter", "instagram", "facebook", "email"],
      required: true,
    },

    subject: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "scheduled",
        "sent",
        "delivered",
        "opened",
        "replied",
        "failed",
      ],
      default: "draft",
    },

    scheduledFor: Date,

    sentAt: Date,

    repliedAt: Date,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Outreach", outreachSchema);
