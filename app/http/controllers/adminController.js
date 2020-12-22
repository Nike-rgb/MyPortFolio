const MessageModel = require('./../../models/MessageModel.js');
const HireModel = require('./../../models/hireModel.js');
const OnlineModel = require('./../../models/onlineModel.js');

module.exports = function () {
  return {
    index(req, res) {
      MessageModel.find({}, (err, messages) => {
        if(err) {
          req.flash('error', "Sorry couldn't fetch the data from database. Please refresh the page");
          return res.redirect('/admin/messages');
        }

        HireModel.find({}, (err, hires) => {
          if(err) {
            req.flash('error', "Sorry couldn't fetch the data from database. Please refresh the page");
            return res.redirect('/admin/messages');
          }

          OnlineModel.find({}, (err, online) =>{
            if(err) {
              req.flash('error', "Sorry couldn't fetch the data from database. Please refresh the page");
              return res.redirect('/admin/messages');
            }

            res.render('admin/admin', {
              title : "Welcome Nikesh",
              messages,
              hires,
              online,
            })
          });


        });
      });
    },

    dismissMessages(req, res) {
      let msgId = req.body.msgId;
      MessageModel.deleteOne({_id : msgId}, err => {
        if(err) {
          return res.json({'error': "Sorry something went wrong"});
        }
        res.end();
      });
    },

    dismissHires(req, res) {
      let hireId = req.body.hireId;
      HireModel.deleteOne({_id : hireId}, err => {
        if(err) {
            return res.json({'error': "Sorry something went wrong"});
        }
        res.end();
      });
    }

  }
}
