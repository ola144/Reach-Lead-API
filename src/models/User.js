const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is a required field!"] },
    email: {
      type: String,
      required: [true, "Email is a required field"],
      unique: true,
    },
    company: { type: String, required: [true, "Company is a required field!"] },
    password: {
      type: String,
      required: [true, "Password is a required field!"],
    },
    role: { type: String, default: "user" },
    avatar: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
