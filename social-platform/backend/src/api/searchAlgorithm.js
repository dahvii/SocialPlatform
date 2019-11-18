const express = require('express');
const router = express.Router();
const User = require('../models/User')


async function getTop10(req, res) {
    let thisUser = await User.findOne({ _id: req.params.id }).populate('myCharacteristics').populate('partnerCharacteristics').catch(err => res.status(400));
    //2. skicka tillbaka den SORTERADE listan snyggt - nu är det en galen array så vi skickar tbk osorterad lista istället
    //3.skicka bara tbk topp tio - inte hela listan 
    
    //find users that havent been seen before 
    let users = await User.find({ $and:[ 
            {_id : { $ne: req.params.id} },
            {_id : { $nin : thisUser.likes} }, 
            {_id : { $nin : thisUser.rejects} }]            
        })
        .populate('myCharacteristics')
        .populate('partnerCharacteristics')
        .catch(err => res.status(400));
        
        console.log("listans längd ", users.length);

    let myPrefSorted = sortPreference(thisUser.partnerCharacteristics);
    //console.log("myPrefSorted ", myPrefSorted);

    let usersChar = [];
    users.forEach((user) => {
        let userCharSorted = sortPreference(user.partnerCharacteristics);
        userCharSorted.push({ id: user._id });
        usersChar.push(userCharSorted);
    })

    //topresult 1
    let sortedUsers = [];
    usersChar.forEach((user) => {
        if (myPrefSorted[0].color === user[0].color && myPrefSorted[1].color === user[1].color && myPrefSorted[2].color === user[2].color && myPrefSorted[3].color === user[3].color) {
            sortedUsers.push(user);
        }
    })

    //result 2
    usersChar.forEach((user) => {
        if (myPrefSorted[0].color === user[0].color && myPrefSorted[1].color === user[1].color) {
            sortedUsers.push(user);
        }
    })

    //result 3
    usersChar.forEach((user) => {
        if (myPrefSorted[0].color === user[0].color) {
            sortedUsers.push(user);
        }
    })

    sortedUsers = sortedUsers.concat(usersChar);

    //take away all duplicate
    for (let i = sortedUsers.length - 1; i > 0; i--) {
        let otherIndex = sortedUsers.findIndex(obj => obj[4] === sortedUsers[i][4]);
        if (otherIndex !== i) {
            sortedUsers.splice(i, 1);
        }
    }


    //id fix before sending to frontend
    let peopleToSwipe = [];
    users.forEach(result => {
        let person = {
            interests: result.interests,
            questionsAnswered: result.questionsAnswered,
            profilePictures: result.profilePictures,
            likes: result.likes,
            rejects: result.rejects,
            matches: result.matches,
            id: result.id,
            firstName: result.firstName,
            email: result.email,
            gender: result.gender,
            hometown: result.hometown,
            bio: result.bio,
            myCharacteristics: result.myCharacteristics,
            partnerCharacteristics: result.partnerCharacteristics,
        }
        peopleToSwipe.push(person)
    });


    res.json(peopleToSwipe)
}

function sortPreference(obj) {    
    let arr = [];
    arr.push({ value: obj.blue, color: "blue" })
    arr.push({ value: obj.yellow, color: "yellow" })
    arr.push({ value: obj.red, color: "red" })
    arr.push({ value: obj.green, color: "green" })

    arr.sort((a, b) => (a.value > b.value) ? -1 : ((b.value > a.value) ? 1 : 0))
    return arr;
}


module.exports.getTop10 = getTop10;