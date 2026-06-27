const express = require("express");

const protect = require("../middleware/auth");

const {
  generateContent,
  generateOutreach,
  generateFollowup,
  rewriteMessage,
  generateSubject,
  getHistory,
} = require("../controllers/aiController");

const router = express.Router();

router.use(protect);

router.post("/generate", generateContent);

router.post("/outreach", generateOutreach);

router.post("/followup", generateFollowup);

router.post("/rewrite", rewriteMessage);

router.post("/subject", generateSubject);

router.get("/history", getHistory);

module.exports = router;
