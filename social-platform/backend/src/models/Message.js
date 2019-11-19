const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let messageSchema = new Schema ({

    message: String,
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    seen: Boolean,
    sentAt: Date
})

module.exports = db.model('Message', messageSchema)