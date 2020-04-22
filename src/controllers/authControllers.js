
const User = require('../models/users');

exports.login = async function (req,res){
    const {email, password} = req.body;
    const user = User.loginWithCredential(email, password);

    //use email to find the correct user 
    // const user = User.findOne({email:email});
    // if(!user) throw new Error("User not found");
    
    //compare raw pass with hashed pass
    // 
    const token = user.generateToken()
    try{

        const token = "special"

        res.status(200).json({status: "ok", data: tooken})

    }catch (err){
        return res.status(400).json({status:"fail", error: err.message})
    }
};

exports.authauth = async function (req,res,next){
    return res.status(401).json({status: "fail"})
}
