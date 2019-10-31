const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let ForumPostSchema = new Schema({

    owner: String, //populate
    comments: [], //(from table comments)
    timeStamp = Date,
    image: [],
    titel: String,
    text: String,
    
    
})

class ForumPostClass {}

module.exports = db.model('ForumPost', ForumPostSchema)