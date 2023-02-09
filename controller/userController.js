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