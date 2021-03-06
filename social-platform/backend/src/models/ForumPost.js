const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongoose').Types;
let ForumPostSchema = new Schema({

    owner: {type: ObjectId, ref: 'User'},
    comments: [{type: ObjectId, ref: 'Comments'}],
    image: String,
    text: String,
    timeStamp: Date,
    isAnonym: Boolean,
    followers: [{type: ObjectId, ref: 'User'}],
})

class ForumPostClass {}

module.exports = db.model('ForumPost', ForumPostSchema)