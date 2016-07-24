var db = require('../models');
var memory = db.Memory;
var user = db.User;


function index(req, res){
  memory.find({})
  .populate('user')
  .exec(function(err, memories){
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(memories);
  });
}


function show(req, res){
  memory.findById(req.params._id)
    .populate('user')
    .exec(function(err, memory){
      if (err){
        res.status(500).send(err);
        return;
      }
      res.json(memory);
    });
  }


function create(req, res){
  var newMem = new memory(req.body, {user_id: req.user._id});
  user.findOne({_id: req.body.user}, function(err, author){
    if(err){
      console.log(err);
    }

   newMem.user_id = user;
  });
  newMem.save(function(err, newMem){
    if(err){
      console.log(err);
    }
    res.redirect('/');
  });
}

function update(req, res){
  memory.findById(req.params._id, function(err, editMemory){
    editMemory.memory = req.params.memory;
    editMemory.mood = req.params.mood;
    editMemory.save(function(err, savedMemory){
      if(err){
        console.log('alert ' + err);
      }
      res.json(savedMemory);
    });
  });
}

function destroy(req, res){
 memory.findOneAndRemove({_id: req.params._id}, function(err, removedMemory){
  res.json(removedMemory);
});
}


module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
