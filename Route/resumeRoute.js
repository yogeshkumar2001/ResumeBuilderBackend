const { saveResume, getResumeById } = require('../Controller');

const resumeRouter = require('express').Router();

resumeRouter.route("/save").post(saveResume)
resumeRouter.route("/").get(getResumeById)

module.exports.resumeRouter = resumeRouter;   