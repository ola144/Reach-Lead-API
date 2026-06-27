const express = require("express");
const protect = require("../middleware/auth");

const {
  getDashboardAnalytics,
  monthlyPerformance,
  platformBreakdown,
  pipelineAnalytics,
  topCampaigns,
  outreachAnalytics,
} = require("../controllers/analyticsController");

const router = express.Router();

router.use(protect);

router.get("/dashboard", getDashboardAnalytics);

router.get("/monthly", monthlyPerformance);

router.get("/platforms", platformBreakdown);

router.get("/pipeline", pipelineAnalytics);

router.get("/campaigns/top", topCampaigns);

router.get("/outreach", outreachAnalytics);

module.exports = router;
