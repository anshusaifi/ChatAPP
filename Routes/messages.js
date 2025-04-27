const express = require('express');
const messageController = require('../controllers/messageController');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.post('/message/:id',async(req,res)=>{
    await isAuthenticated(req,res);
    messageController.sendMessage(req,res);
})

router.get('/getmessage/:id',async(req,res)=>{
      await isAuthenticated(req,res);
      messageController.getMessage(req,res);
})

module.exports  = router;