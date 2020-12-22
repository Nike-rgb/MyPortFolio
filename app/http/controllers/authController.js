const UserModel = require('./../../models/UserModel.js');
const bcrypt = require('bcrypt');
const passport = require('passport');

module.exports = function () {
  return {
    loginIndex(req, res) {
      res.render('auth/login', {
        title : "Login to your account | Nikesh",
      });
    },

    registerIndex(req, res) {
      res.render('auth/register', {
        title : "Sign up for your account | Nikesh",
      });
    },

    register(req, res) {
      const {firstName, lastName, email, password, repassword} = req.body;
      //check if email is unique
      UserModel.findOne({email}, (err, user) => {
        if(err) {
          req.flash('error', 'Sorry, something went wrong.');
          req.flash('email', email);
          req.flash('firstName', firstName);
          req.flash('lastName', lastName);
          return res.redirect('/register');
        }

        if(user) {
          req.flash('error', "User with email already exists.");
          req.flash('firstName', firstName);
          req.flash('lastName', lastName);
          return res.redirect('/register');
        }

        //check if passwords match and contain atleast 8 characters
        if(password != repassword) {
          req.flash('error', 'Password do not match.');
          req.flash('email', email);
          req.flash('firstName', firstName);
          req.flash('lastName', lastName);
          return res.redirect('/register');
        }

        if(password.length < 8) {
          req.flash('error', 'Password should be atleast 8 characters.');
          req.flash('email', email);
          req.flash('firstName', firstName);
          req.flash('lastName', lastName);
          return res.redirect('/register');
        }

        bcrypt.hash(password, 10).then(hashedPassword => {
          new UserModel({
            firstName,
            lastName,
            email,
            password : hashedPassword,
          }).save((err, user) => {
            if(err) {
              req.flash('error', 'Sorry, something went wrong. Try again');
              req.flash('email', email);
              req.flash('firstName', firstName);
              req.flash('lastName', lastName);
              return res.redirect('/register');
            }
            req.flash('error', 'Sign up successful. Log in now.')
            req.flash('email', email);
            res.redirect('/login');
          });
        }).catch(err => {
          req.flash('error', 'Sorry, something went wrong. Try again');
          req.flash('email', email);
          req.flash('firstName', firstName);
          req.flash('lastName', lastName);
          return res.redirect('/register');
        });
      });
    },

    login(req, res){
      passport.authenticate('local', (err, user, info) => {
        if(err) {
          req.flash('email', info.email);
          req.flash('error', info.message);
          return res.redirect('/login');
        }

        if(!user) {
          req.flash('email', info.email);
          req.flash('error', info.message);
          return res.redirect('/login');
        }

        req.logIn(user._id, (err) => {
          if(err) {
            req.flash('email', info.email);
            req.flash('error', info.message);
            return res.redirect('/login');
          }
          res.redirect('/');
        });
      })(req, res);
    },

    logout(req, res) {
      req.logout();
      res.redirect('/');
    },

  }
}
