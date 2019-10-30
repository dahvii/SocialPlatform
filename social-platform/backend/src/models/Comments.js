const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let commentsSchema = new Schema({

    writtenBy: String,
    post: String,
    text: String,
    timeStamp: Date

})

class CommentsClass{}

module.exports = db.model('Comments', commentsSchema)