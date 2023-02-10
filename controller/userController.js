const User = require('../model/user');

module.exports.registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        if(name == null || email == null || password == null){
            return res.status(400).json({err:"bad parameter"})
        }
         
        const isAlredyExist = await User.findOne({where:{email:email}});

        if(isAlredyExist) return res.status(201).json({"message":"User already exists"})

        
    const responce = await User.create({name:name,email:email,password:password})
    res.status(200).json({"status":"success","message":"Successfully Register"});
     
    } catch (error) {
        res.status(501).json({"status":"fail","message":"something went wrong"});
    }
    
}

module.exports.loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body

        const userExist = await User.findOne({where:{email:email}});
           if(!userExist) return res.status(404).json(({"message":"User not found"}));

        const validPassword = await User.findOne({where:{password:password}});
        if(!validPassword) return res.status(401).json({"message":"User not authorized"});

        res.status(200).json({"status":"success","message":"User login sucessful"})
        
    } catch (error) {
        res.status(500).json({"status":"fail","message":"something went wrong"})
    }
}