var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema({
  CountryCode: {
    type: Number,
    unique: true,
    required: true
  },
  ArabicCountryName:{
    type: String,
    unique: true,
    required: true
  },
  EnglishCountryName: {
    type: String,
    unique: true,
    required: true
  },
  ISOCode: {
    type: Number,
    unique: true,
    required: true
  }
});
module.exports = mongoose.model('Country',countrySchema);
