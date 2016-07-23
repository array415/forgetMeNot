var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/forgetMeNot");

module.exports.User = require('./user.js');
module.exports.Memory = require('./memory.js');
