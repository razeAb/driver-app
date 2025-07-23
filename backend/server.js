require("dotenv").config();

const driverRoutes = require("./routes/driverRoutes");
const driverOrdersRoutes = require("./routes/driverOrdersRoutes");

app.use("/api/driver", driverRoutes);
app.use("/api/driver/orders", driverOrdersRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
