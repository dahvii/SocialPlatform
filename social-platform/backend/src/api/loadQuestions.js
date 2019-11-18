const { db } = require('../loaders');
const data = require('../config/questions.json')
const Questions = require('../models/Questions')

async function loadJson(){
    await db.collection('questions').drop().catch((err) => console.log("caught it"));
    Questions.create(data)
}

module.exports.loadJson = loadJson;