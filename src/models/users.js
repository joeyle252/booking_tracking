
const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");

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



schema.methods.toJSON = function () {// to delete some proberty of obj which we don't want to show for users
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject;
};

schema.pre('save', async function (next){// to hash the password, check the docs for more details
    const hashPassword = await bcrypt.hash(this.password, saltRounds)
    this.password = hashPassword;
    next();
})
const User = mongoose.model('User', Schema);

module.exports = User;