const homeController = require('./../../app/http/controllers/homeController.js');
const authController = require('./../../app/http/controllers/authController.js');
const adminController = require('./../../app/http/controllers/adminController.js');
const MessageModel = require('./../../app/models/MessageModel.js');
const HireModel = require('./../../app/models/hireModel.js');
require('./../../app/http/controllers/socketController.js');

const guest = require('./../../app/http/middlewares/guest.js');
const admin = require('./../../app/http/middlewares/admin.js');

module.exports = function(app) {

  app.get('/', homeController().index);

  app.get('/hire', homeController().hireIndex);

  app.post('/hire', homeController().hirePost);

  app.get('/login', guest, authController().loginIndex);

  app.get('/register', guest, authController().registerIndex);

  app.get('/admin/messages', admin, adminController().index);

  app.post('/ask', homeController().askMe);

  app.post('/register', authController().register);

  app.post('/login', authController().login);

  app.get('/logout', (req, res, next) => {
    if(req.isAuthenticated()) next();
    else res.redirect('/');
  }, authController().logout);

  app.post('/admin/dismissMessages', admin, adminController().dismissMessages);

  app.post('/admin/dismissHires', admin, adminController().dismissHires);

}
