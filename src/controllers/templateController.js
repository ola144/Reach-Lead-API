const Template = require("../models/Template");

exports.createTemplate = async (req, res) => {
  const template = await Template.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: template,
  });
};

exports.getTemplates = async (req, res) => {
  const templates = await Template.find({
    createdBy: req.user._id,
  });

  res.json({
    success: true,
    data: templates,
  });
};

exports.deleteTemplate = async (req, res) => {
  await Template.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Template removed",
  });
};
