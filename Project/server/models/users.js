const mongoose = require("mongoose");


const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    designation: {
        type: String,
        require: true
    },
    experience: {
        type: Number,
        require: true
    },
    friendsRequestList: {
        type: [
            {
                firstName: "",
                lastName: "",
                email : ""
            }
        ]
    },
    friendsList: {
        type: [
            {
                firstName: "",
                lastName: "",
                email:""
            }
        ]
    }

});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;