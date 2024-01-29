const { loginUser, verifyUserToken } = require("../Controller");

let authRoute = require("express").Router();

authRoute.route("/").post(loginUser)
authRoute.route("/verify").post(verifyUserToken)

module.exports.authRoute = authRoute;