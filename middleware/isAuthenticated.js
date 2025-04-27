const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

const isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(200).json({ message : "user not authenticate"})
        }

        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            res.status(400).json({message:"invalid user"})
        }
      
        console.log(decode);
        req.id = decode.id;
        

    } catch (error) {
        console.log(error)
    }
}

module.exports = isAuthenticated;