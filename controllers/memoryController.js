var db = require('../models');
var memory = db.Memory;

function index(req, res){
  memory.find({}, function(err, foundMemory){
    res.json(foundMemory);
  });
}

function show(req, res){
  memory.findById(req.params._id, function(err, foundEvent) {
    res.json(foundEvent);
   });
 }
function create(req, res){
  var newMem = new memory(req.body);

  newMem.save(function(err, newMem){
    if(err){
      console.log(err);
    }
    res.json(newMem);
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
