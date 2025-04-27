const mongoose = require('mongoose')

const conversationModel = mongoose.Schema({
    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "userModel"
    }],

    messages : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message"
    }],
    
},{timestamps : true})  

module.exports = mongoose.model('conversationModel',conversationModel)

