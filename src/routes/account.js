const express = require("express");

const protect = require("../middleware/auth");

const {
  connectAccount,
  getAccounts,
  getAccount,
  disconnectAccount,
  deleteAccount,
  accountStats,
  accountHealth,
} = require("../controllers/accountController");

const router = express.Router();

router.use(protect);

router.route("/").get(getAccounts).post(connectAccount);

router.route("/:id").get(getAccount).delete(deleteAccount);

router.patch("/:id/disconnect", disconnectAccount);

router.get("/stats/platforms", accountStats);

router.get("/health", accountHealth);

module.exports = router;
