const express = require('express');
const router = express.Router();
const User = require('../models/User')


async function getTop10(req, res) {
    let allUsers = await User
        .find()
        .populate('myCharacteristics')
        .populate('partnerCharacteristics');

    let thisUser;

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
    let num = 0;
    let sortedUsers = [];

    allUsersChar.forEach((user) => {
        if (myPrefSorted[0].color === user[0].color && myPrefSorted[1].color === user[1].color && myPrefSorted[2].color === user[2].color && myPrefSorted[3].color === user[3].color) {
            num++
            sortedUsers.push(user);

        }
    })
    console.log("första resultat", num);

    //result 2
    num = 0;
    allUsersChar.forEach((user) => {
        if (myPrefSorted[0].color === user[0].color && myPrefSorted[1].color === user[1].color && myPrefSorted[2].color === user[2].color) {
            num++
            sortedUsers.push(user);

        }
    })
    console.log("andra resultat", num);

    //result 3
    num = 0;
    allUsersChar.forEach((user) => {
        if (myPrefSorted[0].color === user[0].color && myPrefSorted[1].color === user[1].color) {
            num++
            sortedUsers.push(user);

        }
    })
    console.log("tredje resultat", num);

    //result 4
    num = 0;
    allUsersChar.forEach((user) => {
        if (myPrefSorted[0].color === user[0].color) {
            num++
            sortedUsers.push(user);

        }
    })
    console.log("fjärde resultat", num);

    console.log(sortedUsers);

    sortedUsers = sortedUsers.concat(allUsersChar);
    console.log(sortedUsers.length);

    //take away all duplicate
    /*
[
    { value: 7, color: 'yellow' },
    { value: 2, color: 'green' },
    { value: 1, color: 'blue' },
    { value: -6, color: 'red' },
    { id: 5dd28f128bd55c4d4a956cdb }
  ],
  [
    { value: 3, color: 'yellow' },
    { value: 1, color: 'green' },
    { value: -2, color: 'red' },
    { value: -4, color: 'blue' },
    { id: 5dd28f128bd55c4d4a956cde }
  ],
  [
    { value: 8, color: 'yellow' },
    { value: 2, color: 'blue' },
    { value: 2, color: 'green' },
    { value: -2, color: 'red' },
    { id: 5dd28f128bd55c4d4a956ce4 }
  ],
    */


   console.log("test", sortedUsers[0]);
   console.log("test", sortedUsers[0][5]);

    for (let i = sortedUsers.length - 1; i > 0; i--) {
        
        let otherIndex = sortedUsers.findIndex(obj => obj[5] === sortedUsers[i][5]);        
        if (otherIndex !== i) {
            sortedUsers.splice(i, 1);
        }
    }

    console.log("99???? ",sortedUsers.length);
    


    //console.log("AllUsersChar ",allUsersChar);





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