const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UserModel = require('./../models/UserModel.js');

passport.serializeUser((userId, done) => {
  done(null, userId);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy({usernameField : 'email'}, (email, password, done) => {
  //check if the email exists
  UserModel.findOne({email}, (err, user) => {
    if(err) {return done(err, false, {message : "Sorry, something went wrong.", email});}

    if(!user) return done(null, false, {message : "No user with such email exists.", email});

    bcrypt.compare(password, user.password).then(match => {
      if(!match) {
        return done(null, false, {message : "Password does not match.", email});
      }

      done(null, user, {message : "Log in successful"});

    }).catch(err => {
      return done(err, false, {message : "Sorry, something went wrong.", email});
    });
  });
}));
