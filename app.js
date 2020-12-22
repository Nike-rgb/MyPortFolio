require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');

//setting up the server
const app = express();
const PORT = process.env.PORT || 3000;
console.log("Server running on port " + PORT);
const server = app.listen(PORT);

//setting up the views
app.set('views', './resources/views');
app.set('view engine', 'ejs');
app.use(expressLayouts);

//serving up the static files
app.use(express.static('./public'));

//parsing the form datas
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//setting up the mongoose connection
mongoose.connect(process.env.MONGODBURI, {
  useNewUrlParser : true,
  useCreateIndex : true,
  useUnifiedTopology : true,
}).then(() => {
  console.log("Connection made");
}).catch(err => {
  throw err;
});

//setting up sessions
app.use(session({
  name : "NikeshPortFolio",
  secret : COOKIE_SECRET,
  store : new MongoStore({
    collection : 'Sessions',
    mongooseConnection : mongoose.connection,
  }),
  cookie : {maxAge : 1000 * 60 * 60},
  resave : false,
  saveUninitialized : true,
}));

app.use(flash());

//setting up the passport for authentication
app.use(passport.initialize());
app.use(passport.session());
require('./app/config/passport.js');

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.req = req;
  next();
});

//setting up the server socket
const io = require('socket.io')(server);
module.exports = io;

//setting up the routes
require('./resources/routes/web.js')(app);
