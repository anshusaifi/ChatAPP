const mongoose = require('mongoose');


async function connection(){
    await mongoose.connect('mongodb://localhost:27017/Chatting').then(()=>{
        console.log("Database Connected Succesfully");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connection;