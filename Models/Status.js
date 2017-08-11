var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statusSchema = new Schema({

  ArabicStatus: {
    type: String,
    unique: true,
    required: true
  },
  EnglishStatus: {
    type: String,
    unique: true,
    required: true
  }
});
module.exports = mongoose.model('Status',statusSchema);
