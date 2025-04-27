const express = require('express');

const usercontroller = require('../controllers/userController');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();
router.use(express.urlencoded({ extended: false }));

router.post("/register", (req, res) => {
  usercontroller.userRegister(req,res)
});

router.post("/login",(req,res)=>{
       usercontroller.login(req,res);
})

router.get("/logout",(req,res)=>{
  usercontroller.logout(req,res)
})

router.get('/',async(req,res)=>{
  await isAuthenticated(req,res);
  usercontroller.getOtherUsers(req,res);
})
module.exports = router;
