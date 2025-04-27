const mongoose = require('mongoose');
const conversationModel = require('../models/conversationModel')
const Message = require('../models/messageModel')


async function sendMessage(req, res) {
    try {
        const senderId = req.id;  // Correct: No 'new'
        const recieverId = req.params.id;  // Correct: No 'new'
        const { message } = req.body;

        let gotConversation = await conversationModel.findOne({
            participants: {  $all:[senderId, recieverId] }
        });

        if (!gotConversation) {
            gotConversation = await conversationModel.create({
                participants: [senderId, recieverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            recieverId,
            message
        });

        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
        }

        await gotConversation.save();
        return res.status(201).json({
            newMessage
        });

    } catch (error) {
        console.log(error);
    }
}

async function getMessage(req, res) {
    try {
        const senderId = req.id  
        const recieverId = req.params.id;  
        
        console.log("BEfore populate")

        const conversation = await conversationModel.findOne({
            participants: { $all: [senderId, recieverId] }
        }).populate("messages")

        console.log("After Populate")
        console.log(conversation?.messages);

        if (!conversation) {
            return res.status(200).json({ message: "Conversation not found" });
        }

        res.status(201).json({
            
            data: conversation?.messages
        });
    } catch (error) {
        console.log("inside error of getMessage")
        console.log(error);
    }
}

module.exports = {
    sendMessage,
    getMessage
};
