const mongoose = require("mongoose");


const friendSchema = mongoose.Schema({
    selfId: {
        type: String,
        require: true
    },
    requestId: {
        type: String
    },
    status:{
        type: String,
        default: "pending"
    }
})

const Friends = mongoose.model("Friends",friendSchema);

module.exports = Friends;