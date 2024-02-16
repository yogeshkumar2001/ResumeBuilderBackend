const { saveResume, getResumeById,deleteResumeById } = require('../Controller');

const resumeRouter = require('express').Router();

resumeRouter.route("/save").post(saveResume)
resumeRouter.route("/").get(getResumeById)
resumeRouter.route("/delete/:id").delete(deleteResumeById)

module.exports.resumeRouter = resumeRouter;   