const client = require("prom-client");

const collectMetrics = (req, res, next) => {
  const end = client
    .histogram({
      name: "http_request_duration_seconds",
      help: "Duration of HTTP requests in seconds",
      labelNames: ["method", "route", "code"],
      buckets: [0.1, 0.5, 1, 1.5, 2, 2.5, 3],
    })
    .startTimer();

  res.on("finish", () => {
    end({ route: req.route.path, code: res.statusCode, method: req.method });
  });

  next();
};

const metricsEndpoint = async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
};

module.exports = { collectMetrics, metricsEndpoint };
