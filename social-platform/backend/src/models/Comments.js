const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;
const {ObjectId} = require('mongoose').Types;
let commentsSchema = new Schema({

    writtenBy: {
        type: ObjectId, ref: 'User'
    },
    post: String,
    text: String,
    timeStamp: Date

})

class CommentsClass{}

module.exports = db.model('Comments', commentsSchema)