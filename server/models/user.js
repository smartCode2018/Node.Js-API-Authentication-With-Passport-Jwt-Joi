const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//Create a schema
const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
}); 

userSchema.pre('save', async function(next){
    try{
        //generate salt
        const salt = await bcrypt.genSalt(10); 
        //generate hash
        const passwordHash = await bcrypt.hash(this.password,salt)
        //re-asign password to hashed value
        this.password = passwordHash
        //call next
        next();
    }catch(err){
        next(err);
    }
})

userSchema.methods.isValidPassword = async function(newPassword){
    try{
        return await bcrypt.compare(newPassword, this.password)
    }catch(err){
        throw new Error(error);
    }
}


//Create a model
const User = mongoose.model('user', userSchema);

//Export the modal
module.exports = User;