var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nationalitySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});
module.exports = mongoose.model('Nationality',nationalitySchema);
