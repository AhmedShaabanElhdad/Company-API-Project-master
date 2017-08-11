var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var endUserSchema = new Schema({
  UserName: {
    type: String,
    required: true
  },
  UserPass: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    unique: true,
    required: true
  },
  Mobile: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  Favourite: [{
    ArticleUrl:String,
    ArticleId:String
  }]

});
module.exports = mongoose.model('EndUser',endUserSchema);
