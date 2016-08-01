var db = require('../models');
var User = db.User;
var passport= require('passport');

// This is written correctly, but generally not a good idea of a route to provide for security reasons
// Imagine if Facebook had an api that returned a JSON response with all users?
function index(req, res){
  User.find({}, function(err, users){
    res.json(users);
  });
}


function show(req, res){
  User.findById({_id: req.params._id}, function(err, foundUser){
  // You can actually just write like this:
    // User.findById(req.params._id, function(err, foundUser){
    res.json(foundUser);
    // What if someone tried to access the show route with a user id that doesn't exist?
    // This would be a good spot to implement some error handling
  });
}

function create(req, res){
  User.register(new User({username: req.body.username, name: req.body.name}), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/');
      });
    }
  );
}

// Why is this in your Users controller? It's a CRUD action for a memory, so it would make
// more sense to put this in the memories controller
// If you were to have a destroy action on this controller, it would be for removing a User

function destroy(req, res){
  // memory is not defined in this controller. If this function were to be called, it would throw an error
  memory.findOneAndRemove({_id: req.params._id}, function(err, removedMemory){
   res.json(removedMemory);
 });
}


module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
};
