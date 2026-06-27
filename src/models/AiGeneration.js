const mongoose = require("mongoose");

const aiGenerationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["outreach", "followup", "campaign", "rewrite", "subject"],
      required: true,
    },

    prompt: {
      type: String,
      required: true,
    },

    output: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      default: "gpt-4o-mini",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("AiGeneration", aiGenerationSchema);
