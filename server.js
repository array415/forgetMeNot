var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db            = require('./models');
var User          = db.User;
var Memory        = db.Memory;

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


//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/signin.html');
});

app.get('/signup', function(req, res){
  res.sendFile(__dirname + '/views/signup.html');
});

app.get('/memory/all', function(req, res){
  Memory.find(function(err, foundMemories){
    res.json(foundMemories);
  });
});

app.post('/memory/all', function(req, res){
  var newMem = new Memory(req.body);

  newMem.save(function(err, newMem){
    if(err){
      console.log(err);
    }
    res.send('Saved new ' + newMem);
  });
});

app.get('/user', function(req, res){
  User.find(function(err, foundUsers){
    res.json(foundUsers);
  });
});
app.post('/user', function(req, res){
  var newUser = new User(req.body);
  newUser.save(function(err, newUser){
    if(err){
      console.log(err);
    }
    res.send('saved' + " " + newUser);
  });
});
app.delete('/user/:username', function(req, res){
  var remove = req.params.username;
  User.findOneAndRemove({username: remove}, function (err, removedUser){
       res.send('You have removed ' + removedUser);
  });
});

app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/user');
      });
    }
  );
});

app.post('/signin', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  res.send('logged in!!!'); // sanity check
  // res.redirect('/'); // preferred!
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
