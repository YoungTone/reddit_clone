var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var mongoose = require('mongoose');
var Post = require('./post');

var userSchema = new mongoose.Schema({

    userName: String,
    avatar: String,
    email: {
        type: String,
        // field is now case insensitive
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

userSchema.pre('remove', function(callback) {
    Post.remove({
        user: this._id
    }).exec();
    callback();
});

userSchema.pre('save', function(next) {

    var user = this;

    // if the password has not been changed, save the user and move on...

    if (!user.isModified('password')) {
        return next();
    }

    bcryptl.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }
        becrypt.hash(user.password, sakt, function(err, hash) {
            if (err) {
                return next(err);
            }
            // define what the password is for the user

            user.password = hash;
            next();
        });
    });
});
// don't want to call this first param "user"! We have another user defined!
// statics === CLASS METHODS
userSchema.statics.authenticate = function(formData, callback) {
    // this refers to the model

    this.findOne({
            email: formData.email
        },
        function(err, user) {
            if (user === null) {
                callback('Invalid username or password', null);
            } else {
                user.checkPassword(formData.password, callback);
            }

        });
};

// methods === INSTANCE METHODS!

userSchema.methods.checkPassword = function(password, callback) {
    var user = this;

    // this refers to the particular instance because it is a method rather than a static

    bcrypt.compare(password, user.password, function(err, isMatch) {
        if (isMatch) {
            callback(null, user);
        } else {
            callback(err, null);
        }
    });
};

var User = mongoose.model('User', userSchema);

module.exports = User;