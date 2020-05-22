const express = require("express");
const receiver_api = require("./receiver");
const userApi = require("./user");

const { internalServerError, notFoundError } = require("../middleware/error");

module.exports = app => {
    app.use(express.json());
    app.get("/", (req, res) => {
        return res.json({
            "success": true,
            "message": "Welcome to streamy!"
        })
    });
    app.use("/api/r/", receiver_api);
    app.use("/api/user/", userApi);
    app.use(notFoundError);
    app.use(internalServerError);
};
