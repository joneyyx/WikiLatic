let mongoose = require('mongoose');

let Schema = mongoose.Schema;

// declare article schema
let articleSchema = new Schema({
    revid: {
        type: Number,
        unique: true
    },
    parentid: Number,
    minor: String,
    user: String,
    timestamp: String,
    size: Number,
    sha1: String,
    parsedcomment: String,
    anno: String,
    title: String
});

module.exports = function (title) {
    mongoose.model('article', articleSchema, title);
};