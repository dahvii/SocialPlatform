const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongoose').Types;

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
    profilePictures: [],
    feedPosts: ({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeedPost'
    }),
    likes: [], //array of users 
    rejects: [], //array of users 

})

class UserClass {}

module.exports = db.model('User', userSchema)