const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let ForumPostSchema = new Schema({

    owner: String, //populate
    comments: [], //(from table comments)
    image: [],
    titel: String,
    text: String,
    timeStamp: Date,
    
    
})

class ForumPostClass {}

module.exports = db.model('ForumPost', ForumPostSchema)