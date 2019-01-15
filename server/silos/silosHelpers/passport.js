var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var {ExtractJwt} = require('passport-jwt');

var LocalStrategy = require('passport-local').Strategy;

var User = require('./../../models/user').model('User');


passport.use(new JwtStrategy({
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'projetsecuritedessi'
}, async (payload, done) => {
    try {
        
        var user =  await User.findById(payload.sub);

        if(!user){
            return done(null, false);
        }

        done(null, user);
    }
    catch(error){

        done(error, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField : 'email'
}, async (email, password, done) => {
    try {

        var user = await User.findOne({email});

        if(!user){
            return done(null, false, {message: 'Aucun compte associé à ce mail !'});
        }

        if(user && user.role == 'bloqué'){
            return done(null, false, {message: 'Vous avez été bloqué, Contactez l\'admin !'});
        }
        if(user && user.role == 'supprimé'){
            return done(null, false, {message: 'Aucun compte associé à ce mail !'});
        }
    
        var isPasswordCorrect = await user.comparePassword(password);
    
        if(!isPasswordCorrect){
            return done(null, false, {message: 'Mot de passe Incorrect !'});
        }
    
        done(null, user);    

    }
    catch(error){
        done(error, false);
    }
   
}));
