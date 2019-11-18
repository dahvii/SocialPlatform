const { db } = require('../loaders');
const data = require('../config/users.json')
const User = require('../models/User')
const Characteristics = require('../models/Characteristics')

async function loadUsers() {
    await db.collection('users').drop().catch((err) => console.log("no users in db"));
    await db.collection('characteristics').drop().catch((err) => console.log("no characteristics in db"))
    data.forEach(async user => {
        const myCharacteristics = await new Characteristics({
            blue: Math.floor(Math.random() * 20) - 10,
            red: Math.floor(Math.random() * 20) - 10,
            green: Math.floor(Math.random() * 20) - 10,
            yellow: Math.floor(Math.random() * 20) - 10
        }).save()
        const partnerCharacteristics = await new Characteristics({
            blue: Math.floor(Math.random() * 20) - 10,
            red: Math.floor(Math.random() * 20) - 10,
            green: Math.floor(Math.random() * 20) - 10,
            yellow: Math.floor(Math.random() * 20) - 10
        }).save()
        let newUser = new User({
            ...user,
            myCharacteristics,
            partnerCharacteristics
        })
        newUser.save()
            .catch();
    })
}

module.exports.loadUsers = loadUsers;