var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sourceSchema = new Schema({
  SourceCode: {
    type:Number,
    required:true,
    unique:true
  },
  SourceName: {
    type:String,
    required:true,
    unique:true
  },
  ArabicSourceName: {
    type:String,
    required:true,
    unique:true
  },
  EnglishSourceName: {
    type:String,
    required:true,
    unique:true
  },
  Country: {
    type:Number,
    required:true
  },
  Langauge: {
    type:Number,
    required:true
  },
  URL: {
    type:String,
    required:true
  },
  Classification: {
    type:Number,
    required:true
  },
  Logo: {
    type:String,
    required:true
  },
  Slogan: String,
  OwnerName: String,
  About: String,
  Status:{
    type:String,
    required:true
  }
});
module.exports = mongoose.model('Source',sourceSchema);
