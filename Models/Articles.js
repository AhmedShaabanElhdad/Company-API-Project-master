var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    ArticleID: {
        type: Number,
        unique: true,
        required: true
    },
    SourceCode: {
        type: Number,
        required: true
    },
    SectionID: {
        type: Number,
        required: true
    },
    LanguageID: {
        type: Number,
        required: true
    },
    CountryID: {
        type: Number,
        required: true
    },
    PublishDate: {
        type: String,
        required: true
    },
    GetDate: {
        type: String,
        required: true
    },
    Caption: {
        type: String,
        required: true
    },
    Auther: {
        type: String,
        required: true
    },
    FullText: {
        type: String,
        required: true
    },
    Comments: [
        {
            comment: String,
            date: Date,
            username: String
        }
    ],
    ImageCaption: {
        type: String,
        required: true
    },
    ImageOnlineUrl: {
        type: String,
        required: true
    },
    ImageofflineURL: {
        type: String,
        required: true
    },
    onlineURL: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    NoOffComments: {
        type: Number,
        required: true
    },
    NooffLikes: {
        type: Number,
        required: true
    },
    NoOffSeen: {
        type: Number,
        required: true
    },
    Extracted: {
        type: String,
        required: true
    },
    Sentment: {
        type: String,
        required: true
    },
    Audited: {
        type: String,
        required: true
    },
    Approved: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Article', articleSchema);
