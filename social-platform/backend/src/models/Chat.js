const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let chatSchema = new Schema({

    to: String,
    from: String,
    seen: Boolean,
    message: String,
    timeStamp: Date

})

class ChatClass {}

module.exports = db.model('Chat', chatSchema)