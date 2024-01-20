const { userModel } = require("../Model/userModel")


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
    console.log("wehfbehfbjhe")
    try {
        let { id } = req.params
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
exports.deleteUserById = async (req,res) => {
    try{
        let {id} = req.params;
        console.log(id);
        let deletedObj = await userModel.findByIdAndDelete(id);
        res.json({
            message:"Sucess",
            data:deletedObj,
            status:200
        })
    }
    catch(error){
        res.json({
            message:"error",
            error:error,
            status:400
        })
    }
}

