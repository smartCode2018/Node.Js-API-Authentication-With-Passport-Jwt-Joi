const JWT = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config').get(process.env.MODE_ENV);
const passport = require('passport');


signToken = (user) =>{
    return token =JWT.sign({
        iss:'JusticeKelechi',
        sub: user._id,
        ist:new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1) //current time plus 1 day
    }, config.JWT_SECRET)
}

module.exports = {
    //sign up
    signUp: async (req, res, next)=>{
        console.log('User sign up');

        //gets the values from the router helper function
        const {email, password} = req.value.body;

        //checks if user already exist
        const checkUser = await User.findOne({email});
        if(checkUser){return res.status(401).json({error: 'Email already exit' });}

        //saves the new user
        const newUser = new User({
            email,
            password
        });
        await newUser.save();

        //generate Token
        const token = signToken(newUser);

        //respond with token
        res.status(200).json({token});
        // res.status(200).json({user: 'created'});
        // next();
    }, 

    //sign in
    signIn: async (req, res, next)=>{
        console.log('User sign in');
        const token = signToken(req.user);
        res.status(200).json({token});
    },

    //secret
    secret: async (req, res, next)=>{
        console.log('Secured');
        res.send(200);
    }
}