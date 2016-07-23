var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.js');

var MemorySchema = new Schema({
  memory: String,
  user_id: {type: Schema.Types.ObjectId, ref: "User"},
  mood: String,

});

var Memory = mongoose.model('Memory', MemorySchema);
module.exports = Memory;
