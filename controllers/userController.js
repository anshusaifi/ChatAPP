const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv')
dotenv.config();

const userRegister = async(req,res)=>{
   try {
      const {fullName,userName,password,Confirmpassword,gender} = req.body;
      if(!fullName || !userName|| !password || !Confirmpassword ||!gender){
         return res.status(400).json({message : "all fields are required"})
      }
      if(password !== Confirmpassword){
            return res.status(400).json({message:"password and Confirm Password must be same"})
      }
      const user = await User.findOne({userName});
      if(user){
         return res.status(400).json({message : "User already exists"})
      }
     
         const hashedPassword =await bcrypt.hash(password,10);
         const maleAvatar  = "https://avatar.iran.liara.run/public/boy?username="+userName+"";
         const femaleAvatar = "https://avatar.iran.liara.run/public/girl?username="+userName+"";
     
          await User.create({
         fullName,
         userName,
         password : hashedPassword,
         profilePhoto:gender==="male"? maleAvatar : femaleAvatar,
         gender
      })
      return res.status(201).json({message : "Signup Succesfully"});
   } catch (error) {
      console.log(error)
   }

}




async function login(req,res){
 try {
   const {userName,password} = req.body;
   if(!userName || !password){
     return res.status(400).json({message : "all fields are required"})
   }

   const user = await User.findOne({userName});
   if(!user){
     return res.status(400).json({message : "Incorrect username"})
   }

 const isPassword = await bcrypt.compare(password,user.password);
 if(!isPassword){
  return res.status(400).json({message : "Incorrect password"})
 }
 const tokendata = {
  id : user._id
 }

 const token = await jwt.sign(tokendata,process.env.SECRET_KEY);
 return res.status(200).cookie("token",token).json({
  _id : user._id,
  username : user.userName,
  fullname : user.fullName,
  profilePhoto:user.profilePhoto

 })

 } catch (error) {
   console.log(error)
 }

  
}


async function logout(req,res){
   return res.status(200).cookie("token","").json({
      message : "user logged out succesfully"
   })
}

async function getOtherUsers(req,res) {
     
     try {
      const loogedinUserId = req.id;
      const otherusers = await User.find({_id:{$ne:loogedinUserId}}).select("-password");
      return res.status(200).json({otherusers})
     } catch (error) {
      console.log(error);
     }
}
module.exports = {
   userRegister,
   login,
   logout,
   getOtherUsers

}
   

