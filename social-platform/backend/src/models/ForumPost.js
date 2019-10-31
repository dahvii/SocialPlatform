const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let feedPostSchema = new Schema({

    owner: String, //populate
    likes: Number,
    comments: [], //(from table comments)
    timeStamp = Date,
    image: [],
    titel: String,
    text: String,
    
    
})

class FeedPostClass {}

module.exports = db.model('ForumPost', feedPostSchema)