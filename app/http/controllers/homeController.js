const MessageModel = require('./../../models/MessageModel.js');
const HireModel = require('./../../models/hireModel.js');

module.exports = function () {
  return {
    index(req, res) {
      res.render('index', {
        title : "Hello I'm Nikesh",
      });
    },

    hireIndex(req, res) {
      res.render('hire', {
        title : "Share some details about you | Nikesh",
      });
    },

    askMe(req, res) {
      const {askMeQuestion, askMeEmail} = req.body;
      console.log(req.body);
      if(!askMeQuestion || !askMeEmail) return res.json({'error' : "You missed one or more fields. The message wasn't sent"});
      let isEmailValid = false;
      let emailArr = askMeEmail.split('');
      for(let i = 0; i < emailArr.length ; i ++) {
        if(emailArr[i] == '@') {
          isEmailValid = true;
          break;
        }
      }
      if(!isEmailValid) return res.json({'error' : "Please enter a valid email."});
      new MessageModel(req.body).save(err => {
        if(err) return res.json({'error' : "Sorry, something went wrong. Try again."});
        res.end();
      });
    },

    hirePost(req, res) {
      //const {firstName, lastName, email, hiringReason} = req.body;
      HireModel(req.body).save((err) => {
        if(err) {
          req.flash('error', "Something went wrong. Try again.");
          return res.redirect('/hire');
        }
        req.flash('alert', "I'll try to get in touch with you soon. Cheers!");
        res.redirect('/');
      });
    },
  }
}
