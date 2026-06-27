const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserDetails,
} = require("../controllers/authController");
const protect = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);

router.use(protect);
router.get("/user-details/:id", getUserDetails);

module.exports = router;
