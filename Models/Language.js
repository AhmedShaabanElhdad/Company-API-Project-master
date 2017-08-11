var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var languageSchema = new Schema({

  ArabicLangage: {
    type: String,
    unique: true,
    required: true
  },
  EnglishLangauge: {
    type: String,
    unique: true,
    required: true
  }
});
module.exports = mongoose.model('Language',languageSchema);
