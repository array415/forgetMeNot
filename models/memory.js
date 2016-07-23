var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemorySchema = new Schema({
  memory: String,
  // user_id:{
  //   type: ObjectId,
  //   ref: 'user'
  // }
});

var Memory = mongoose.model('Memory', MemorySchema);
module.exports = Memory;
