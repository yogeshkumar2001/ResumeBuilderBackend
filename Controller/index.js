const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const { userModel } = require("../Model/userModel");
const { resumeModel } = require("../Model/resumeModel");
const { OAuth2Client } = require('google-auth-library');
dotenv.config()

const CLIENT_ID = process.env.GOOGLE_PRIVATE_KEY;
const client = new OAuth2Client(CLIENT_ID);

exports.test = async (req, res) => {
    return res.json({
        message: "done",
        status: 200
    })
}
exports.createUser = async (req, res) => {
    try {
        const userData = req.body.data; // Use provided userDataObj or fallback to req.body.data
        const userObj = await userModel.create(userData);
        res.json({
            message: "User created successfully",
            data: userObj,
            status: 201 // Changed status to 201 for successful resource creation
        });
    } catch (error) {
        res.status(400).json({ // Changed status to 400 for bad request
            error: error.message, // Use error.message to get the error message
            message: "Failed to create user",
            status: 400
        });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        let users = await userModel.find({});
        res.json({
            message: "Success",
            status: 200,
            data: users
        });
    } catch (error) {
        res.status(500).json({ // Changed status to 500 for internal server error
            message: "Failed to get all users",
            error: error.message,
            status: 500
        });
    }
};

exports.getUsersById = async (req, res) => {
    try {
        let { id } = req.params;
        let userObj = await userModel.findById(id);
        if (userObj) {
            res.json({
                message: "Success",
                data: userObj,
                status: 200
            });
        } else {
            res.status(404).json({ // Changed status to 404 for resource not found
                message: "User not found",
                status: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to get user by id",
            error: error.message,
            status: 500
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        let { id } = req.params;
        let reqData = req.body;
        let updatedUserObj = await userModel.findByIdAndUpdate(id, reqData, { new: true });
        if (updatedUserObj) {
            res.json({
                message: "User updated successfully",
                data: updatedUserObj,
                status: 200
            });
        } else {
            res.status(404).json({
                message: "User not found",
                status: 404
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "Failed to update user",
            error: error.message,
            status: 400
        });
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedObj = await userModel.findByIdAndDelete(id);
        if (deletedObj) {
            res.json({
                message: "User deleted successfully",
                data: deletedObj,
                status: 200
            });
        } else {
            res.status(404).json({
                message: "User not found",
                status: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete user",
            error: error.message,
            status: 500
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body.data;
        let user = await userModel.findOne({ email: email }).exec();
        if (user && user.password == password) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '120s' });
            res.json({
                data: user,
                message: "User logged in successfully",
                status: 200,
                token: token
            });
        } else {
            res.status(401).json({ // Changed status to 401 for unauthorized access
                data: null,
                message: "Incorrect email or password",
                status: 401
            });
        }
    }
    catch (error) {
        res.status(500).json({ // Changed status to 500 for internal server error
            error: error.message,
            message: "Failed to log in",
            status: 500
        });
    }
};

exports.verifyUserToken = async (req, res) => {
    try {
        const { token } = req.body;
        const verify = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        res.json({
            data: verify.userId,
            message: "Token verified successfully",
            status: 200
        });
    }
    catch (error) {
        res.status(401).json({ // Changed status to 401 for unauthorized access
            error: error.message,
            message: "Failed to verify token",
            status: 401
        });
    }
};

exports.saveResume = async (req, res) => {
    try {
        let data = req.body.data.Data;
        let resumeObj = await resumeModel.create(data);
        if (resumeObj) {
            return res.status(201).json({ // Changed status to 201 for resource created
                data: resumeObj,
                message: "Resume saved successfully",
                status: 201
            });
        }
    } catch (error) {
        return res.status(500).json({ // Changed status to 500 for internal server error
            error: error.message,
            message: "Failed to save resume",
            status: 500
        });
    }
};
exports.deleteResumeById = async (req, res) => {
    try {
        let id = req.params.id;
        let deletedObj = await resumeModel.findByIdAndDelete(id);
        if (deletedObj) {
            return res.status(200).json({
                data: deletedObj,
                message: "Resume deleted successfully",
                status: 200
            });
        } else {
            return res.status(404).json({ // Changed status to 404 for resource not found
                message: "Resume not found",
                status: 404
            });
        }
    } catch (error) {
        return res.status(500).json({ // Changed status to 500 for internal server error
            error: error.message,
            message: "Resume deletion failed",
            status: 500
        });
    }
};

exports.getResumeById = async (req, res) => {
    try {
        const { resumeId, userId } = req.query;
        let resumeObj = null;
        if (resumeId) {
            resumeObj = await resumeModel.findById(resumeId);
        } else if (userId) {
            resumeObj = await resumeModel.find({ userId: userId });
        } else {
            return res.status(400).json({ // Changed status to 400 for bad request
                message: "Either resumeId or userId must be provided",
                status: 400
            });
        }

        if (resumeObj) {
            return res.json({
                data: resumeObj,
                message: "Successfully retrieved resume",
                status: 200
            });
        } else {
            return res.status(404).json({ // Changed status to 404 for resource not found
                message: "Resume not found",
                status: 404
            });
        }
    } catch (error) {
        return res.status(500).json({ // Changed status to 500 for internal server error
            error: error.message,
            message: "Failed to retrieve resume",
            status: 500
        });
    }
};
async function createUserByGoogle(userData) {
    try {
        const userObj = await userModel.create(userData);
        return {
            message: "User created successfully",
            data: userObj,
            status: 200
        };
    } catch (error) {
        return {
            error: error.message,
            message: "Failed to create user",
            status: 400
        };
    }
}

exports.googleUserVerify = async (req, res) => {
    try {
        const { idToken } = req.body.data;

        // Verify the Google ID Token
        const ticket = await client.verifyIdToken({
            idToken,
            audience: CLIENT_ID,
        });

        const payload = await ticket.getPayload();

        if (payload.email_verified) {
            let userEmailExists = await userModel.findOne({ email: payload.email });

            if (userEmailExists) {
                return res.status(200).json({
                    data: userEmailExists,
                    message: "User logged in successfully",
                    status: 200
                });
            } else {
                let userObj = {
                    email: payload.email,
                    name: payload.name,
                    GAuthUser: true,
                    imgUrl: payload.picture
                };

                let userData = await createUserByGoogle(userObj);

                if (userData.status === 200) {
                    return res.status(200).json({
                        data: userData.data,
                        message: "User created and logged in successfully",
                        status: 200
                    });
                } else {
                    return res.status(400).json({
                        error: userData.error,
                        message: "Failed to create user",
                        status: 400
                    });
                }
            }
        }
    } catch (error) {
        console.error("Error in googleUserVerify:", error);
        return res.status(500).json({
            error: "Internal Server Error",
            status: 500
        });
    }
};