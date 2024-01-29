const jwt = require("jsonwebtoken");
const { userModel } = require("../Model/userModel");
const { resumeModel } = require("../Model/resumeModel");


exports.test = async (req, res) => {
    return res.json({
        message: "done",
        status: 200
    })
}
exports.createUser = async (req, res) => {
    try {
        let data = req.body;
        let userObj = await userModel.create(data);
        res.json({
            message: "user created successfully",
            data: userObj,
            status: 200
        })
    }
    catch (error) {
        res.json({
            error: error,
            message: "failed to create user",
            status: 400
        })
    }
}
exports.getAllUser = async (req, res) => {
    try {
        let users = await userModel.find({});
        //    let is =  user[0]._id.toString();
        //     console.log(user,is);
        res.json({
            message: "Success",
            status: 200,
            data: users
        })
    } catch (error) {
        res.json({
            message: "failed to get all users",
            status: 400,
            error: error
        })
    }
}
exports.getUsersById = async (req, res) => {
    try {
        let { id } = req.params
        console.log(typeof id)
        let userObj = await userModel.findById(id);
        res.json({
            message: "Success",
            data: userObj,
            status: 200
        })
    } catch (error) {
        res.json({
            message: "failed to get user by id ",
            error: error,
            status: 400
        })
    }
}



exports.updateUser = async (req, res) => {
    try {
        let { id } = req.params;
        let reqData = req.body;
        let updatedUserObj = await userModel.findByIdAndUpdate(id, reqData, { new: true });
        res.json({
            message: "user updated successfully",
            data: updatedUserObj,
            status: 200
        })
    }
    catch (error) {
        res.json({
            message: "failed to updated user",
            error: error,
            status: 400
        })
    }
}
exports.deleteUserById = async (req, res) => {
    try {
        let { id } = req.params;
        console.log(id);
        let deletedObj = await userModel.findByIdAndDelete(id);
        res.json({
            message: "Sucess",
            data: deletedObj,
            status: 200
        })
    }
    catch (error) {
        res.json({
            message: "error",
            error: error,
            status: 400
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email }).exec();
        if (user && user.password == password) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '120s' })
            res.json({
                data: user,
                message: "user logged in successfully",
                status: 200,
                token: token
            })
        } else {
            res.json({
                data: null,
                message: "user failed to log in",
                status: 400
            })
        }
    }
    catch (error) {
        res.json({
            error: error,
            message: "user failed to log in",
            status: 400
        })
    }
}

exports.verifyUserToken = async (req, res) => {
    try {
        const { token } = req.body;
        const verify = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        res.json({
            data: verify.userId,
            message: "token verify successfull",
            status: 200
        })
    }
    catch (error) {
        res.json({
            error: error,
            message: "token verify failed",
            status: 400
        })
    }
}

//resume create
exports.saveResume = async (req, res) => {
    try {
        let data = req.body;
        let resumeObj = await resumeModel.create(data);
        if (resumeObj) {
            res.json({
                data: data,
                message: "resume saved successfully",
                status: 200
            })
        }
    } catch (error) {
        res.json({
            error: data,
            message: "failed to save resume",
            status: 400
        })
    }
}
exports.getResumeById = async (req, res) => {
    try {
        const { resumeId, userId } = req.query;

        let resumeObj = null
        if (resumeId) {
            resumeObj = await resumeModel.findById(resumeId);
        } else if (userId) {
            resumeObj = await resumeModel.find({ userId: userId })
        } else {
            // Handle the case where neither resumeId nor userId is provided
            return res.status(400).json({
                message: "Either resumeId or userId must be provided",
            });
        }

        if (resumeObj) {
            res.json({
                data: resumeObj,
                message: "Successfully get resume",
                status: 200,
            });
        } else {
            res.json({
                message: "Resume not found",
                status: 404,
            });
        }
    } catch (error) {
        res.json({
            error: error.message,
            message: "Failed to get resume",
            status: 400,
        });
    }
};