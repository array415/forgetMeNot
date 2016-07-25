var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var MemorySchema = new Schema({
  memory: String,
  mood: Boolean,
  imgUrl: String,
  who: String,
  _user: {type: Schema.Types.ObjectId, ref: 'User'}
});

var Memory = mongoose.model('Memory', MemorySchema);
module.exports = Memory;
