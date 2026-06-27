const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
    },

    company: {
      type: String,
      default: "",
    },

    jobTitle: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      enum: [
        "linkedin",
        "twitter",
        "instagram",
        "facebook",
        "website",
        "manual",
      ],
      default: "manual",
    },

    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "proposal", "won", "lost"],
      default: "new",
    },

    notes: {
      type: String,
      default: "",
    },

    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
    },

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

module.exports = mongoose.model("Lead", leadSchema);
