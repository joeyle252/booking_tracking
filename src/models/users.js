
const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRound = 10;
const jwt = require("jsonwebtoken");

const schema = mongoose.Schema({
    // email, name, pass, token
    email: {
        type: String,
        requires: [true, "email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            }
        }
    },
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    password: {
     type: String,
    required: [true, "password is required"]
},
token: [String]
});

scema.statics.loginWithCredentials = async (email,password)=>{
    const user = await User.findOne({email:email});
    if(!user) throw new Error("user not found")
    const allow = await bcrypt.compare(password.toString, user.password)
    if(!allow) throw new Error("password not correct")
    return user
}

schema.methods.generateToken = function (){
    const jsonToken = jwt.sign({email: this.email, id:this._id},process.env.SECRET);
    this.tokens.push(jsonToken)
    await this.save();
    return jsonToken;
}


schema.methods.toJSON = function () {// to delete some proberty of obj which we don't want to show for users
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject;
};

schema.pre('save', async function (next){// to hash the password, check the docs for more details
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
})
const User = mongoose.model('User', Schema);

module.exports = User;