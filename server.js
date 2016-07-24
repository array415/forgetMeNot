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
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//bodyparser

//static

app.get('/', function(req, res){
  if(req.user){
    res.sendFile(__dirname + '/views/memory.html');
  } else{
    res.redirect('/signin');
  }
});

app.get('/memories/new', function(req, res){
  res.sendFile(__dirname + '/views/create.html');
});

app.get('/signin', function(req, res){
  res.sendFile(__dirname + '/views/signin.html');
});

app.get('/users', function(req, res){
  res.sendFile(__dirname + '/views/signup.html');
});

app.get('/memories', controllers.memory.index);
app.post('/memories', controllers.memory.create);
app.get('/memories/:_id', controllers.memory.show);
app.put('/memories/:_id', controllers.memory.update);
app.delete('/memories/:_id', controllers.memory.destroy);

app.get('/users', controllers.User.index);
app.get('/users/:_id', controllers.User.show);
app.post('/users', controllers.User.create);
app.delete('/users/:_id', controllers.User.destroy);

app.post('/', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  res.redirect('/');
});



app.get('/logout', function (req, res) {
  console.log("BEFORE logout", JSON.stringify(req.user));
  req.logout();
  console.log("AFTER logout", JSON.stringify(req.user));
  res.redirect('/');
});

app.listen(7000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
