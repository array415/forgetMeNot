
var db = require('./models');



db.User.remove({}, function(err, animals){
  console.log('removed');
});
