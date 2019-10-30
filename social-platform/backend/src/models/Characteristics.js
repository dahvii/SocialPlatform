const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let charateristicsSchema = new Schema({

    name: String,
    value: Number

})

class CharateristicsClass {}

module.exports = db.model('Charateristics', charateristicsSchema)