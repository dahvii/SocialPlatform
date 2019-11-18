const express = require('express');
const router = express.Router();
const User = require('../models/User')


async function getTop10(req, res) {
    let thisUser = await User.findOne({ _id: req.params.id }).catch();
    console.log(thisUser);

    //1. ta bort alla användare som redan setts (gör bättre fetch från databas så vi inte hämtar fel personer)
    //2. skicka tillbaka listan snyggt - nu är det en galen array så vi skickar tbk allusers istället
    
    //find users that havent been seen before 
    let allUsers = await User
        .find()
        .populate('myCharacteristics')
        .populate('partnerCharacteristics');


    allUsers.forEach(user => {
        if (user._id == req.params.id) {
            thisUser = user;
            allUsers.splice(allUsers.indexOf(user), 1)
        }
    })
    let myPrefSorted = sortPreference(thisUser.partnerCharacteristics);
    console.log("myPrefSorted ", myPrefSorted);

    let allUsersChar = [];
    allUsers.forEach((user) => {
        let userCharSorted = sortPreference(user.partnerCharacteristics);
        userCharSorted.push({id: user._id});
        allUsersChar.push(userCharSorted);
    })

    //topresult 1
    let sortedUsers = [];
    allUsersChar.forEach((user) => {
        if (myPrefSorted[0].color === user[0].color && myPrefSorted[1].color === user[1].color && myPrefSorted[2].color === user[2].color && myPrefSorted[3].color === user[3].color) {
            sortedUsers.push(user);
        }
    })

    //result 2
    allUsersChar.forEach((user) => {
        if (myPrefSorted[0].color === user[0].color && myPrefSorted[1].color === user[1].color) {
            sortedUsers.push(user);
        }
    })

    //result 3
    allUsersChar.forEach((user) => {
        if (myPrefSorted[0].color === user[0].color) {
            sortedUsers.push(user);
        }
    })

    sortedUsers = sortedUsers.concat(allUsersChar);

    //take away all duplicate
    for (let i = sortedUsers.length - 1; i > 0; i--) {
        let otherIndex = sortedUsers.findIndex(obj => obj[4] === sortedUsers[i][4]);        
        if (otherIndex !== i) {
            sortedUsers.splice(i, 1);
        }
    }


    //id fix before sending to frontend
    let peopleToSwipe = []; 
    allUsers.forEach( result => {
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
            partnerCharacteristics:result.partnerCharacteristics,
        }
        peopleToSwipe.push(person)
    }); 
    

    res.json(peopleToSwipe)



    // .then(result => {
    //     let idFixedArr = [];
    //     result.map((user) => {
    //         const idFixedUser = {
    //             id: user._id,
    //             firstName: user.firstName,
    //             bio: user.bio,
    //             dateOfBirth: user.dateOfBirth,
    //             gender: user.gender,
    //             interests: user.interests,
    //             matches: user.matches,
    //             profilePictures: user.profilePictures,
    //             likes: user.likes,
    //             rejects: user.rejects
    //         }
    //         idFixedArr.push(idFixedUser);
    //     })
    //     console.log("innan res")
    //     res.json(idFixedArr)
    // })
    // .catch(err => res.status(400).json('Error: ' + err));
    ;
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