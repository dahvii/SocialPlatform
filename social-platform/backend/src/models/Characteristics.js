const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let characteristicsSchema = new Schema({

    blue: { type: Number, default: 0 },
    red: { type: Number, default: 0 },
    yellow: { type: Number, default: 0 },
    green: { type: Number, default: 0 }

})

module.exports = db.model('Characteristics', characteristicsSchema)