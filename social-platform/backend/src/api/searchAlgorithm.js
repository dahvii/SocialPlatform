const express = require('express');
const User = require('../models/User')
const router = express.Router();


async function getTop10(req, res) {
    let thisUser = await User.findOne({ _id: req.params.id })
        .populate('partnerCharacteristics')
        .catch(err => res.status(400));

    //find users that havent been seen before 
    let users = await User.find({
        $and: [
            { _id: { $ne: req.params.id } },
            { _id: { $nin: thisUser.likes } },
            { _id: { $nin: thisUser.rejects } }]
    })
        .populate('myCharacteristics')
        .catch(err => res.status(400));



    let myPrefSorted = sortPreference(thisUser.partnerCharacteristics);

    users = applyGenderPref(users, thisUser.genderPreference);   
    users= applyAgePref(users, thisUser.agePreference);
   
    users.forEach((user) => {
        user.myCharSorted = sortPreference(user.myCharacteristics)
    })

    let sortedUsers = sortList(users, myPrefSorted);

    sortedUsers = removeDuplicates(sortedUsers)

    sortedUsers.splice(10);

    //format fix before sending to frontend
    let peopleToSwipe = fixFormat(sortedUsers);

    res.json(peopleToSwipe)
}

function applyGenderPref(users, pref) {
    if (pref.length === 0 || pref.length === 3) {
        //they have no preference or like all genders so nothing to do
        return users
    }
    if (!pref.includes("Female")) {
        users = users.filter(user => (user.gender === "Male" || user.gender === "NonBinary"));
    }
    if (!pref.includes("NonBinary")) {
        users = users.filter(user => user.gender === "Male" || user.gender === "Female");
    }
    if (!pref.includes("Male")) {
        users = users.filter(user => user.gender === "NonBinary" || user.gender === "Female");
    }
    return users
}

function applyAgePref(users, pref) {
    users= users.filter(user => getAge(user) >= pref[0] && getAge(user) <= pref[1])
    return users;
}
function getAge(user) {
    let today = new Date();
    let age = today.getFullYear() - user.dateOfBirth.getFullYear();
    let monthDifference = today.getMonth() - user.dateOfBirth.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < user.dateOfBirth.getDate())) {
        age--;
    }
    return age
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

function sortList(users, myPrefSorted) {
    let sortedUsers = [];
    //topresult 1
    users.forEach((user) => {
        if (myPrefSorted[0].color === user.myCharSorted[0].color && myPrefSorted[1].color === user.myCharSorted[1].color && myPrefSorted[2].color === user.myCharSorted[2].color && myPrefSorted[3].color === user.myCharSorted[3].color) {
            sortedUsers.push(user);
        }
    })

    //result 2
    users.forEach((user) => {
        if (myPrefSorted[0].color === user.myCharSorted[0].color && myPrefSorted[1].color === user.myCharSorted[1].color) {
            sortedUsers.push(user);
        }
    })
    //result 3
    users.forEach((user) => {
        if (myPrefSorted[0].color === user.myCharSorted[0].color) {
            sortedUsers.push(user);
        }
    })

    //add the lowest result
    sortedUsers = sortedUsers.concat(users);

    return sortedUsers;
}

function removeDuplicates(sortedUsers) {
    //take away all duplicate
    for (let i = sortedUsers.length - 1; i > 0; i--) {
        let otherIndex = sortedUsers.findIndex(obj => obj._id === sortedUsers[i]._id);
        if (otherIndex !== i) {
            sortedUsers.splice(i, 1);
        }
    }
    return sortedUsers;
}

function fixFormat(sortedUsers) {
    let peopleToSwipe = [];
    sortedUsers.forEach(user => {
        let person = {
            interests: user.interests,
            questionsAnswered: user.questionsAnswered,
            profilePictures: user.profilePictures,
            likes: user.likes,
            rejects: user.rejects,
            matches: user.matches,
            id: user.id,
            firstName: user.firstName,
            email: user.email,
            gender: user.gender,
            hometown: user.hometown,
            bio: user.bio,
            myCharacteristics: user.myCharacteristics,
            partnerCharacteristics: user.partnerCharacteristics,
            dateOfBirth: user.dateOfBirth
        }
        peopleToSwipe.push(person)
    });
    return peopleToSwipe;
}

module.exports.getTop10 = getTop10;