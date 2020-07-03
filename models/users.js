var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');
var Schema = mongoose.Schema;

// define the schema for our user model
var userSchema = Schema({

    name        : { type : String, default: '', required: true },
    lastname    : { type : String, default: '', required: true },
    email       : { type : String, default: '', required: true },
    password    : { type : String, default: '', required: true },
    created_at  : { type : Date, default: Date.now },
    updated_at  : { type : Date, default: Date.now },
    deleted     : { type : Boolean, default: false },

}, {collection: 'user', usePushEach: true});

// HOOKS
userSchema.pre('save', function(next){

    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    if( typeof user.password != 'undefined' ){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                next();
            });
        });
    }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);