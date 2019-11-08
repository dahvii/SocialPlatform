const mongoose = require('mongoose');
const { db } = require('../loaders');
const { ObjectId } = require('mongoose').Types;
const Schema = mongoose.Schema;

let userSchema = new Schema({
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    gender: String,
    bio: String,
    interests: [], //(from table interests)
    characteristics: [], //(from table characteristics)
    matches: [],
    profilePictures: [],
    feedPosts: ({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeedPost'
    })

})

class UserClass {}

module.exports = db.model('User', userSchema)