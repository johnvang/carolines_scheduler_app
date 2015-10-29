var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    email: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    targetHours: {type: Number, required: false},
    hoursAvail: [{day: String, first: {start: Date, end: Date}, second: {start: Date, end: Date}}],
    shift: [{day: String, first: {start: Date, end: Date}, second: {start: Date, end: Date}}]

    //hoursAvail: [{ type: Schema.Types.ObjectId, ref: 'Availability' }]
    //changeReq: [{type: Schema.Types.ObjectId, ref: 'Change'}]
});

UserSchema.pre('save', function(next){
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) return next(err);
        //since this is middlware, any error that happens is happening in the middle of an action,
        // therefore we will pass along any error to be picked up later
        //hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash){
            if (err) return next(err);

            //override the clear text password
            user.password = hash;
            next();
        });
    });
});


UserSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);