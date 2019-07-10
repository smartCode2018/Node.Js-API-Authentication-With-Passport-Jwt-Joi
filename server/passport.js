const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../server/config').get(process.env.MODE_ENV);

const User = require('./models/user');


//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
    try{
        //find user specified in the token
        const user = await User.findById(payload.sub);
    
        //if user doesn't exist, handle it
        if(!user){
            return done(null, false); 
        }

        //otherwise return the user
        done(null, user);

    }catch(err){
        done(err, false)
    }
}))

//LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done)=>{
    try{
        //check if user already exit
        const user = await User.findOne({email});

        //if not found
        if(!user){
            return done(null, false);
        }
        //check if password is correct
        const isMatch = await user.isValidPassword(password);
        
        //if not handle it
        if(!isMatch){return done(null, false);}

        //otherwise return the  user
        done(null, user);
    }catch(err){
        done(null, err);
    }
    
}))