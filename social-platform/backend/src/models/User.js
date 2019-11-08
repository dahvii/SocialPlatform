const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    gender: String,
    bio: String,
    interests: [{
        type: Schema.Types.ObjectId,
        ref: 'Interests'
    }],
    characteristics: [], //(from table characteristics)
    matches: [],
    profilePictures: String,
    feedPosts: ({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeedPost'
    })

})

class UserClass {}

module.exports = db.model('User', userSchema)