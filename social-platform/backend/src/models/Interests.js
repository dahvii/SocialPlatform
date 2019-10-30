const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let interestsSchema = new Schema({

    name: String

})

class InterestsClass {}

module.exports = db.model('Interests', interestsSchema)