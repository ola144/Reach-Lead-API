const express = require("express");

const protect = require("../middleware/auth");

const {
  createOutreach,
  getOutreachHistory,
  updateStatus,
  outreachStats,
} = require("../controllers/outreachController");

const router = express.Router();

router.use(protect);

router.post("/send", createOutreach);

router.get("/history", getOutreachHistory);

router.patch("/:id/status", updateStatus);

router.get("/stats", outreachStats);

module.exports = router;
