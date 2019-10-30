const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let userSchema = new Schema({

    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    dateOfBirth: Date,
    gender: String,
    bio: String,
    interests: [], //(from table interests)
    characteristics: [], //(from table characteristics)
    matches: [],
    profilePictures: []

})

class UserClass {}

module.exports = db.model('User', userSchema)