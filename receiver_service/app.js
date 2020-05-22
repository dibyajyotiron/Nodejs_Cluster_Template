require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const config = require("config");
const port = config.get("port") || process.env.PORT || 4000;
require("colors");
require("./services/db").mongodb(process.env.NODE_ENV);
require("./services/db").loadModels();
require("./middleware/morgan")(app);
require("./routes/index")(app);

app.listen(port, () => console.log(`Server is running on ${port}`))