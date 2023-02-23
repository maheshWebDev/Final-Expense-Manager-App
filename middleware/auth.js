const jwt = require('jsonwebtoken');

const User = require('../model/userModel');

module.exports.authenticate = async(req,res,next)=>{
    try {
        const token = req.header('Authorization');
        // console.log(token);
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        // console.log(payload)
        const user = await User.findByPk(payload.userId);
        // console.log(user)
        if(!user) return res.status(401).json({"status":"fail","message":"user not found"});
        req.user = user;
       next()
    } catch (error) {
       res.status(500).json({"message":"something went wrong"});
    }
}