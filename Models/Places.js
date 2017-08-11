var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});
module.exports = mongoose.model('Places',placeSchema);
