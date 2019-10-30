const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let feedPostSchema = new Schema({

    owner: String, //populate
    likes: Number,
    comments: [], //(from table comments)
    timeStamp = Date,
    image: [],
    text: String,
    
})

class FeedPostClass {}

module.exports = db.model('FeedPost', feedPostSchema)