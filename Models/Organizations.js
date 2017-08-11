var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var organizationSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});
module.exports = mongoose.model('Organization',organizationSchema);
