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
    interests: [{
        type: Schema.Types.ObjectId,
        ref: 'Interests'
    }],
    characteristics: [], //(from table characteristics)
    profilePictures: [],
    likes: [], //array of users 
    rejects: [], //array of users 

})

class UserClass {}

module.exports = db.model('User', userSchema)