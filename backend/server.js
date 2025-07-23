require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const driverRoutes = require("./routes/driverRoutes");
const driverOrdersRoutes = require("./routes/driverOrdersRoutes");

const app = express();
app.use(express.json());

app.use("/api/driver", driverRoutes);
app.use("/api/driver/orders", driverOrdersRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
