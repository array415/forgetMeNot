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

app.use(express.static(__dirname + '/public'));
//authentification
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

app.set('view engine', 'hbs');
app.use('/vendor', express.static(__dirname + '/bower_components'));

app.get('/', function(req, res){
  res.render('index', {user: JSON.stringify(req.user) + "|| null"});
  if (!req.user) {
  return res.redirect('/signin');
 }
});

app.get('/create', function(req, res){
  res.render('create', {user: JSON.stringify(req.user) + "|| null"});
  if (!req.user) {
  return res.redirect('/signin');
 }
});
// get sigin page
app.get('/signin', function(req, res){
  res.render('signin');
});
//get signup page
app.get('/signup', function(req, res){
  res.render('signup');
});

app.get('/api/memories', controllers.memory.index);
app.get('/api/memories/:_id', controllers.memory.show);
app.get('/api/memories/:userId', controllers.memory.showUser);
app.post('/api/memories', controllers.memory.create);
app.put('/api/memories/:_id', controllers.memory.update);
app.delete('/api/memories/:_id', controllers.memory.destroy);

app.get('/api/users', controllers.user.index);
app.get('/api/users/:_id', controllers.user.show);
app.post('/api/users', controllers.user.create);
app.delete('/api/users/:_id', controllers.user.destroy);

app.post('/signin', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  res.redirect('/');
});

app.get('/api', controllers.get.getApi);
app.get('/logout', controllers.get.getLogOut);

app.listen(process.env.PORT || 7000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
