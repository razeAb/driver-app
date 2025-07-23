const driverRoutes = require("./routes/driverRoutes");
const driverOrdersRoutes = require("./routes/driverOrdersRoutes");

app.use("/api/driver", driverRoutes);
app.use("/api/driver/orders", driverOrdersRoutes);
