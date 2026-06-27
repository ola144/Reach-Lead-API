const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");

require("express-async-errors");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const connectDB = require("./app");

const authRoutes = require("./src/routes/auth");
const leadsRoutes = require("./src/routes/leads");
const campaignsRoutes = require("./src/routes/campaign");
const outreachRoutes = require("./src/routes/outreach");
const templateRoutes = require("./src/routes/template");
const analyticsRoutes = require("./src/routes/analytics");
const accountRoutes = require("./src/routes/account");
const aiRoutes = require("./src/routes/ai");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/campaigns", campaignsRoutes);
app.use("/api/outreach", outreachRoutes);
app.use("/api/template", templateRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/ai", aiRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
  });
