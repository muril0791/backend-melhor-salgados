const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const orderRoutes = require("./routes/orderRoutes");
const promBundle = require("express-prom-bundle");
const logger = require("./utils/logger");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectando ao MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/MelhorSalgadosDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Usando as rotas de pedido
app.use("/api/orders", orderRoutes);

// Prometheus metrics middleware
app.use(promBundle({ includeMethod: true }));

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

module.exports = app;
