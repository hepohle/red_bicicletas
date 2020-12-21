const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const FacebookTokenStrategy = require('passport-facebook-token');

passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET
}, function(accessToken, refreshToken, profile, done){
    try{
        User.findOneOrCreateByFacebook(profile, function(err, user){
            if (err) console.log('err' + err);
            return done(err, user);
        });
    }catch(err2){
        console.log(err2);
        return done(err2, null);
    }
});

passport.use(new LocalStrategy(
    (email, password, done)=>{
        //we search the user by his/her email
        Usuario.findOne({email: email}, (err, usuario)=>{
            //If there is a error
            if(err) return done(err)
            //If there is not user with taht email
            if(!usuario) return done(null, false, {message: 'Email no existente o incorrecto'});
            //Is password is not valid
            if (usuario.password != password) { return done(null, false, {message: 'Password no existente o incorrecto'}); }
            //if (!usuario.validPassword(password)) return done(null, false, {message: 'Password no existente o incorrecto'});

            //Everthing is OK. Execute the callaback
            return done(null, usuario)
        })
    }
));

passport.use(new GoogleStrategy({
    consumerKey: process.env.GOOGLE_CLIENT_ID,
    consumerSecret: process.env.GOOGLE_CLIENT_SECRET,
    callabackURL: process.env.HOST + "/auth/google/callback"
},
    function(accessToken, refreshToken, profile, cb){
        console.log(profile);

        Usuario.findOneOrCreateByGoogle(profile, function(err, user){
            return cb(err, user);
        });
    })
);

//cb(callback)
passport.serializeUser(function(user,cb){
    cb (null, user.id);
});

passport.deserializeUser((id, cb)=>{
    Usuario.findById(id, function(err, usuario){
        cb (err, usuario)
    });
});

module.exports = passport;