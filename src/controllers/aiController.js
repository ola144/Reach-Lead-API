const AIService = require("../services/AiService");

const AiGeneration = require("../models/AiGeneration");

exports.generateContent = async (req, res) => {
  const { prompt, type } = req.body;

  const result = await AIService.generate(prompt);

  const history = await AiGeneration.create({
    user: req.user._id,
    prompt,
    output: result,
    type,
  });

  res.json({
    success: true,
    data: history,
  });
};

exports.generateOutreach = async (req, res) => {
  const { firstName, company, jobTitle, goal } = req.body;

  const prompt = `
Write a professional outreach message.

Lead Name: ${firstName}
Company: ${company}
Role: ${jobTitle}

Goal:
${goal}

Keep it concise.
`;

  const result = await AIService.generate(prompt);

  res.json({
    success: true,
    message: result,
  });
};

exports.generateFollowup = async (req, res) => {
  const { originalMessage } = req.body;

  const prompt = `
Create a polite follow-up message.

Original Message:

${originalMessage}
`;

  const result = await AIService.generate(prompt);

  res.json({
    success: true,
    message: result,
  });
};

exports.rewriteMessage = async (req, res) => {
  const { message, tone } = req.body;

  const prompt = `
Rewrite the message.

Tone:
${tone}

Message:
${message}
`;

  const result = await AIService.generate(prompt);

  res.json({
    success: true,
    message: result,
  });
};

exports.generateSubject = async (req, res) => {
  const { purpose } = req.body;

  const prompt = `
Generate 10 email subject lines.

Purpose:
${purpose}
`;

  const result = await AIService.generate(prompt);

  res.json({
    success: true,
    message: result,
  });
};

exports.getHistory = async (req, res) => {
  const history = await AiGeneration.find({
    user: req.user._id,
  })
    .sort({
      createdAt: -1,
    })
    .limit(50);

  res.json({
    success: true,
    data: history,
  });
};
