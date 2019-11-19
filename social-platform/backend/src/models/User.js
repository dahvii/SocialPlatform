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
    hometown: String,
    bio: String,
    interests: [{
        type: Schema.Types.ObjectId,
        ref: 'Interests'
    }],
    questionsAnswered: { type: Number, default: 0 },
    myCharacteristics: {
        type: Schema.Types.ObjectId,
        ref: "Characteristics"
    }, 
    partnerCharacteristics: {
        type: Schema.Types.ObjectId,
        ref: "Characteristics"
    }, 
    profilePictures: [],
    likes: [], //array of users 
    rejects: [], //array of users 
    matches: [{
        type: Schema.Types.ObjectId,
        ref: 'Match'
    }]
    admin: Boolean
})

class UserClass {}

module.exports = db.model('User', userSchema)