
var db = require('./models');


var users = [
  {name: 'frank'},
  {name: 'frankOne'},
  {name: 'doug'},
  {name: 'andy'}
];


db.User.remove({}, function(err, animals){
  console.log('removed');
});

db.User.create(users, function(err, users){
  if(err){
    return "error" + err;
  }
  console.log('created users');
  process.exit();
});
