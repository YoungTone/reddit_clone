var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reddit_clone');

mongoose.set('debug', true);

module.exports.User = require('./user');
module.exports.Post = require('./post');