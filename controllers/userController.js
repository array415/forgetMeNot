var db = require('../models');
var User = db.User;
var passport= require('passport');


function index(req, res){
  User.find({})
  .populate('memory')
  .exec(function(err, books){
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(books);
    });
  }


function show(req, res){
  User.findById({_id: req.params._id}, function(err, foundUser){
    res.json(foundUser);
  });
}

function create(req, res){
  User.register(new User({username: req.body.username, name: req.body.name}), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/users');
      });
    }
  );
}

function destroy(req, res){
  memory.findOneAndRemove({_id: req.params._id}, function(err, removedMemory){
   res.json(removedMemory);
 });
}

function update(req, res){

}


module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
