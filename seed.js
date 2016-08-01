
var db = require('./models');


// You could consider nesting these so you can include
// process.exit() after all records have been removed
// i.e. remove all users and for each user, remove all of that user's memories

db.User.remove({}, function(err, users){
  console.log('removed');
});

db.Memory.remove({}, function(err, memories){
  console.log('removed ' + memories);
});
