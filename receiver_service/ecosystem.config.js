function returnCommonConfig(appName, NODE_ENV) {
  return {
    name: appName,
    script: "./app.js",
    args: "one two",
    exec_mode: "cluster",
    instances: "max",
    watch: true,
    ignore_watch: ["node_modules", "logs", "broker/logs"],
    env: {
      NODE_ENV,
    },
    log_date_format: "ddd, DD-MMM-YYYY, hh:mm:ss A UTCZ",
  };
}

module.exports = {
  apps: [
    {
      ...returnCommonConfig("receiver_prod", "production"),
    },
    {
      ...returnCommonConfig("receiver_staging", "development"),
    },
    { ...returnCommonConfig("local", "localhost") },
  ],
};
