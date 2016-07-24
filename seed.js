
var db = require('./models');



db.User.remove({}, function(err, users){
  console.log('removed');
});

db.Memory.remove({}, function(err, memories){
  console.log('removed ' + memories);
});
