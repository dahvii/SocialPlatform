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
    interests: [], //(from table interests)
    characteristics: [], //(from table characteristics)
    likes: [], //array of users 
    rejects: [], //array of users 
    matches: [],
    profilePictures: []

})

class UserClass {}

module.exports = db.model('User', userSchema)