const express = require("express");

const protect = require("../middleware/auth");

const {
  createCampaign,
  getCampaigns,
  getCampaign,
  updateCampaign,
  deleteCampaign,
  dashboardMetrics,
} = require("../controllers/campaignController");

const router = express.Router();

router.use(protect);

router.route("/").get(getCampaigns).post(createCampaign);

router
  .route("/:id")
  .get(getCampaign)
  .put(updateCampaign)
  .delete(deleteCampaign);

router.get("/dashboard/metrics", dashboardMetrics);

module.exports = router;
