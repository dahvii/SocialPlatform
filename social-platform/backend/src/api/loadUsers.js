const { db } = require('../loaders');
const data = require('../config/users.json')
const Questions = require('../models/User')

async function loadUsers(){
    await db.collection('questions').drop().catch((err) => console.log("cought it"));
    Questions.create(data)
}

module.exports.loadUsers = loadUsers;