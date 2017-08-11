var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: String,
  Phone: {
    type: Number,
    unique: true,
    required: true
  }
});
module.exports = mongoose.model('Favourite',companySchema);
