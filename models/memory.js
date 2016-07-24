var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemorySchema = new Schema({
  memory: String,
  mood: String,
  imgUrl: String,
  who: String,
  user_id: {type: Schema.Types.ObjectId, ref: 'User'}
});

var Memory = mongoose.model('Memory', MemorySchema);
module.exports = Memory;
