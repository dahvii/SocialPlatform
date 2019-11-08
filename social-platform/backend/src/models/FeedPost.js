const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let feedPostSchema = new Schema({

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    comments: [], //(from table comments)
    timeStamp: Date,
    text: String,
    feedImage: {
        type: String,
    }
    
})

class FeedPostClass {}

module.exports = db.model('FeedPost', feedPostSchema)