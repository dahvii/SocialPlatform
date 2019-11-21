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
    gender: { type: String, default: ''},
    hometown: { type: String, default: ''},
    bio: { type: String, default: ''},
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
    profilePictures: { type: Array, default: []}, 
    likes: { type: Array, default: []}, 
    rejects: { type: Array, default: []}, 
    matches: [{
        type: Schema.Types.ObjectId,
        ref: 'Match',
        default: []
    }],
    admin: {type:Boolean, default: false},
    genderPreference: { type: Array, default: []},
    agePreference: { type: Array, default: []}
})

class UserClass {}

module.exports = db.model('User', userSchema)