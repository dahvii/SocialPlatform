const { db } = require('../loaders');
const data = require('../config/users.json')
const User = require('../models/User')
const Characteristics = require('../models/Characteristics')

async function loadUsers(){
    await db.collection('users').drop().catch((err) => console.log("no users in db"));
    
    data.forEach(async user => {
        const myCharacteristics = await new Characteristics({}).save()
        const partnerCharacteristics = await new Characteristics({}).save()
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