const User = require('../model/userModel');

const jwt = require('jsonwebtoken')

const bcrypt =  require('bcrypt')

function generateAccessToken(user) {
    return jwt.sign({userId:user.dataValues.id},process.env.JWT_SECRET);
  }

module.exports.registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        if(name == null || email == null || password == null){
            return res.status(400).json({err:"bad parameter"})
        }
         
        const user = await User.findOne({where:{email:email}});

        if(user) return res.status(201).json({"message":"User already exists"})

        const saltRound = 10;
       const hashedPassword = await bcrypt.hash(password,saltRound);

       if(hashedPassword){
        const responce = await User.create({name:name,email:email,password:hashedPassword})
        res.status(200).json({"status":"success","message":"Successfully Register"});
       }
        
     
    } catch (error) {
        res.status(501).json({"status":"fail","message":"something went wrong"});
    }
    
}

module.exports.loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body

        const user = await User.findOne({where:{email:email}});
        if(!user) return res.status(404).json(({"status":"fail", "message":"Invalid Email"}));

        const validPassword = await bcrypt.compare(password,user.dataValues.password);

        if(!validPassword) return res.status(401).json({"message":"User not authorized"});
        
        const token = generateAccessToken(user)

        res.status(200).json({"status":"success","message":"User login sucessful","token":token})
        
    } catch (error) {
        res.status(500).json({"status":"fail","message":"something went wrong"})
    }
}