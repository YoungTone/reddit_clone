var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    // userName: String,
    title: String,
    body: String,
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;