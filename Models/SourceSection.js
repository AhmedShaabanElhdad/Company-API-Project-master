var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SourceSectionSchema = new Schema({

  ArabicSecation: {
    type: String,
    unique: true,
    required: true
  },
  EnglishSection: {
    type: String,
    unique: true,
    required: true
  },
  Status: {
    type: String,
    unique: true,
    required: true
  },
  SectionLevel: {
    type: String,
    unique: true,
    required: true
  },
  ParentID: {
    type: Number,
    unique: true,
    required: true
  }
});
module.exports = mongoose.model('SourceSection',SourceSectionSchema);
