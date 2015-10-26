/**
 * Created by johnvang on 10/25/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AvailabitySchema = new Schema({
    _creator : { type: Schema.Types.ObjectId, ref: 'User' },
    mon1start: String,
    mon1end: String,
    mon2start: String,
    mon2end: String,
    tue1start: String,
    tue2end: String,
    tue3start: String,
    tue4end: String,
    wed1start: String,
    wed1end: String,
    wed2start: String,
    wed2end: String,
    thu1start: String,
    thu1end: String,
    thu2start: String,
    thu2end: String,
    fri1start: String,
    fri1end: String,
    fri2start: String,
    fri2end: String
});

module.exports = mongoose.model('Availability', AvailabitySchema);