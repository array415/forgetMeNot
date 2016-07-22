var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');
var cookieParser  = require('body-parser');
var session       = require('express-session');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db            = require('./models');
var User          = db.User;

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//auth
app.use(cookieParser());
app.use(session({
  secret: 'abc',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res){
  res.render('memories');
});


//Auth Routes
app.get('/signup', function(req, res){
  res.render('signup');
});

app.post('/signup', function(req, res){
  User.register(new User({ username: req.body.username }), req.body.password,
    function(err, NewUser) {
      passport.authenticate('local')(req, res, function(){
        res.send('Signed up!!!');
      });
    }
  );
});
