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
  console.log(JSON.stringify(req.user));
  if (!req.user) {
    res.redirect('/signin');
    return;
  }

});

app.get('/create', function(req, res){
  res.render('create', {user: JSON.stringify(req.user) + "|| null"});
  if (!req.user) {
  res.redirect('/signin');
  return;
 }
});
// get sigin page
app.get('/signin', function(req, res){
  res.render('signin');
  return;
});
//get signup page
app.get('/signup', function(req, res){
  res.render('signup');
  return;
});

// The controller name should be plural
  // i.e. controllers.memories.index would point to 'memoriesController'
app.get('/api/memories', controllers.memory.index);

// I'd suggest writing /api/memories/:id without the underscore for this and other routes
// That's a more common convention
app.get('/api/memories/:_id', controllers.memory.show);

// This is not RESTful. You should hit the /api/users/:id route to access one user by id
app.get('/api/memories/:userId', controllers.memory.showUser);
app.post('/api/memories', controllers.memory.create);
app.put('/api/memories/:_id', controllers.memory.update);
app.delete('/api/memories/:_id', controllers.memory.destroy);

// The controller for users should be plural too
  // i.e. controllers.users.index would point to 'usersController'
app.get('/api/users', controllers.user.index);
app.get('/api/users/:_id', controllers.user.show);
app.post('/api/users', controllers.user.create);
app.delete('/api/users/:_id', controllers.user.destroy);

app.post('/signin', passport.authenticate('local'), function (req, res) {
  res.redirect('/');
  // This return isn't necessary and isn't doing anything there. Once the response is sent, the code stops executing
  return;
});

app.get('/api', controllers.get.getApi);
app.get('/logout', controllers.get.getLogOut);

app.listen(process.env.PORT || 7000, function () {

  // You should change this console log to say 7000 if that is where your server is going to run
  console.log('Express server is up and running on http://localhost:3000/');
});
