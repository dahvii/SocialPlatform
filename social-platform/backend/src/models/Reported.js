const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongoose').Types;
let ReportedSchema = new Schema({

    persons: [{type: ObjectId, ref: 'User'}],
    forumPosts: [{type: ObjectId, ref: 'ForumPost'}],
    comments: [{type: ObjectId, ref: 'Comments'}],
    feedPosts: [{type: ObjectId, ref: ' FeedPosts'}],
})

module.exports = db.model('Reported', ReportedSchema)