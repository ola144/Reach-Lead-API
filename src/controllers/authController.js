const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password, company } = req.body;
  // if (!name || !email || !password || !company)
  //   return res.status(400).json({ message: "Missing fields" });
  const existing = await User.findOne({ email });
  if (existing)
    return res.status(400).json({ message: "Email already in use" });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    company,
    password: hashed,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password);

  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  });
};

exports.getUserDetails = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json({
    success: true,
    data: user,
  });
};
