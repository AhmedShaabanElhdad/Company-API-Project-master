var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classificationSchema = new Schema({

  ArabicClassification: {
    type: String,
    unique: true,
    required: true
  },
  englishClassification: {
    type: String,
    unique: true,
    required: true
  },
  Status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Classification',classificationSchema);
