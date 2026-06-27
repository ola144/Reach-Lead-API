const express = require("express");

const protect = require("../middleware/auth");

const {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
  leadStats,
  pipelineStats,
} = require("../controllers/leadsController");

const router = express.Router();

router.use(protect);

router.route("/").get(getLeads).post(createLead);

router.route("/:id").get(getLead).patch(updateLead).delete(deleteLead);

router.get("/stats/overview", leadStats);

router.get("/stats/pipeline", pipelineStats);

module.exports = router;
