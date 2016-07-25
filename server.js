var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db            = require('./models');
var controllers   = require('./controllers');
var User          = db.User;


//auth
app.use(express.static(__dirname + '/public'));
app.use(cookieParser('secret'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'superSecret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/memory.html');
  if (!req.user) {
  return res.redirect('/signin');
 }
});

app.get('/api', controllers.Get.getApi);
app.get('/memories/new', function(req, res){
  res.sendFile(__dirname + '/views/create.html');
  if (!req.user) {
  return res.redirect('/signin');
 }
});

app.get('/signin', function(req, res){
  res.sendFile(__dirname + '/views/signin.html');
});

app.get('/signup', function(req, res){
  res.sendFile(__dirname + '/views/signup.html');
});

app.get('/api/memories', controllers.memory.index);
app.post('/api/memories', controllers.memory.create);
app.get('/api/memories/:_id', controllers.memory.show);
app.put('/api/memories/:_id', controllers.memory.update);
app.delete('/api/memories/:_id', controllers.memory.destroy);

app.get('/api/users', controllers.User.index);
app.get('/api/users/:_id', controllers.User.show);
app.post('/api/users', controllers.User.create);
app.delete('/api/users/:_id', controllers.User.destroy);

app.post('/', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  res.redirect('/');
});

app.get('/logout', controllers.Get.getLogOut);

app.listen(7000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
