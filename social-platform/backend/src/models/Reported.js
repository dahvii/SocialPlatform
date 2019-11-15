const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongoose').Types;
let ReportedSchema = new Schema({

    persons: [{type: ObjectId, ref: 'User'}],
    forumposts: [{type: ObjectId, ref: 'Forumposts'}],
    comments: [{type: ObjectId, ref: 'Comments'}],
    feedPosts: [{type: ObjectId, ref: ' Feedposts'}],
    
})

module.exports = db.model('Reported', ReportedSchema)