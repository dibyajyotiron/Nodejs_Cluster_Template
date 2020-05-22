require("dotenv").config();
const mongoose = require("mongoose");
const config = require("config");

const onConnectionMessage = env => {
    if (env === "localhost") console.info("Connected database: " + `${config.get("mongoURI")[env]}...`.green);
    else console.info(`Connected ` + `${env}`.blue + ` database on ` + `Atlas...`.green);
};

module.exports = {
    mongodb: env => {
        try {
            mongoose.Promise = global.Promise;
            mongoose.connect(config.get("mongoURI")[env], {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            });
            mongoose.connection.once("open", () => {
                onConnectionMessage(env);
            });
            mongoose.connection.on("reconnected", () => {
                console.log("Connection Reestablished...");
            });

            mongoose.connection.on("disconnected", () => {
                console.log("Connection Disconnected");
            });

            mongoose.connection.on("close", () => {
                console.log("Connection Closed");
            });

            mongoose.connection.on("error", error => {
                console.log("ERROR: " + error);
                console.log("Trying to Reconnect...");
            });
            mongoose.set("applyPluginsToChildSchemas", false);
        } catch (error) {
            console.error(`${error.message}`);
        }
    },
    // load all the model files in the models dir at runtime and call function before loading the routes
    loadModels: () => {
        const { readdirSync } = require("fs");
        const { join } = require("path");
        const { platform } = require("os");
        var normalizedPath = join(__dirname, "../models");
        readdirSync(normalizedPath).forEach(function (file) {
            if (platform === "win32") require(normalizedPath + "\\" + file);
            else require(normalizedPath + "/" + file);
        });
    },
};
