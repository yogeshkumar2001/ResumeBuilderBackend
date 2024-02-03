const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: [6, "password must be gerater than 6 charcters"]
    },
    confirmPassword: {
        type: String,
        validator: function () {
            this.password == this.confirmPassword;
        }
    },
    name: {
        type: String,
        required: true
    },
    resumesId: {
        type: String,
    },
    GAuthUser: {
        type: Boolean,
        required: true

    }
})
let userModel = mongoose.model("Users", userSchema);
module.exports.userModel = userModel;