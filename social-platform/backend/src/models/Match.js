const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let matchSchema = new Schema({

    person: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    matchId: String,
    messages: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },
    match_seen: Boolean
})

module.exports = db.model('Match', matchSchema)