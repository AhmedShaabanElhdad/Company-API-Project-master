var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});
module.exports = mongoose.model('Person',personSchema);
