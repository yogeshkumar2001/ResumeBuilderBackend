const mongoose =  require("mongoose");

let userSchema  =  mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"password must be gerater than 6 charcters"]
    },
    confirmPassword:{
        type:String,
        required:true,
        validator:function(){
            this.password == this.confirmPassword;
        }
    },
    name:{
        type:String,
        required:true
    },
    resumesId:{
        type:String,
    },
})
let userModel = mongoose.model("Users",userSchema);
module.exports.userModel = userModel;