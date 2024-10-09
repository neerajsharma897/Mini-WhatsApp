const mongoose =  require("mongoose");

const chatSchema = new mongoose.Schema({
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    msg:{
        type: String
    },
    created_At :{
        type: Date,
        required: true
    },
    updated_At :{
        type : Date,
    }
});

const Chat = new mongoose.model("Chat", chatSchema);

module.exports = Chat;