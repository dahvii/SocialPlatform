const { db } = require('../loaders');
const data = require('../config/users.json')
const User = require('../models/User')
const Characteristics = require('../models/Characteristics')
const bcrypt = require('bcryptjs')

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

        let genderPreference= getRandomGenders();

        let minAge= getRandomInt(18, 60)
        let maxAge= getRandomInt(minAge, 60)
        let agePreference= [minAge, maxAge];

        let newUser = new User({
            ...user,
            myCharacteristics,
            partnerCharacteristics,
            genderPreference,
            agePreference
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .catch(err);
            });
        });
    })

    function getRandomGenders(){
        const gender = ["Female", "NonBinary", "Male"];
        let genderPreference= [];

        for(let i = 0; i < getRandomInt(1, 4); i++){
            let random = getRandomInt(0, gender.length);
            genderPreference.push(gender[random]);
            gender.splice(random, 1);
        }
        return genderPreference
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
  
    
}

module.exports.loadUsers = loadUsers;