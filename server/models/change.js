/**
 * Created by johnvang on 10/25/15.
 */
/**
 * Created by johnvang on 10/25/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChangeSchema = new Schema({
    _creator : { type: Schema.Types.ObjectId, ref: 'User' },
    username: String,
    body: String
});


module.exports = mongoose.model('Change', ChangeSchema);