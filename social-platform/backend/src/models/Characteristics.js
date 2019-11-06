const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let characteristicsSchema = new Schema({

    name: String,
    value: Number

})

class CharateristicsClass {}

module.exports = db.model('Charateristics', characteristicsSchema)