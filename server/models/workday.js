/**
 * Created by johnvang on 10/28/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var WorkdaySchema = new Schema({
    day: String,
    shift1: [{student: String, start: Date, end: Date}],
    shift2: [{student: String, start: Date, end: Date}]
});

module.exports = mongoose.model('Workday', WorkdaySchema);