var db = require('../models');
var memory = db.Memory;

function index(req, res){
  memory.find({})
  .populate('_user')
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
  .populate('_user')
  .exec(function(err, memory){
    if (err){
      res.status(500).send(err);
      return;
    }
    res.json(memory);
  });
}


function create(req, res){
  var newMemory = new memory(req.body);
  newMemory._user = req.user;
  newMemory.save(function(err, savedMemory){
    if(err){
      console.log(err);
    }

  });
  res.redirect('/');
}



function update(req, res){
  memory.findById(req.params._id, function(err, editMemory){
    editMemory.memory = req.params.memory;
    editMemory.mood = req.params.mood;
    editMemory.who = req.params.mood;
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

function showUser(req, res){
  var userId = req.params.userId;
  memory.find({_user: userId})
    .populate('_user')
    .exec(function(err, memory){
      if (err){
        res.send(err);
        return;
      }
      res.json(memory);
    });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update,
  showUser: showUser
};
