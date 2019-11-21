const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let questionsSchema = new Schema({

    question: String,
    answer: [],
    type: String

})

class QuestionsClass {}

module.exports = db.model('Questions', questionsSchema)