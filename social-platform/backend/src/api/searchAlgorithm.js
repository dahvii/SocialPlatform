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
        if(user._id == req.params.id){
            thisUser = user;
            allUsers.splice(allUsers.indexOf(user), 1)
        }
    })
   // console.log("thisUser.partnerCharacteristics: ", thisUser.partnerCharacteristics)
    let myPrefSorted = sortPreference(thisUser.partnerCharacteristics);

    
    let allUsersChar = [];
    allUsers.forEach((user)=> {
        let userCharSorted = sortPreference(user.partnerCharacteristics);
        userCharSorted.push(user._id);
        allUsersChar.push(userCharSorted);
    })

    console.log("AllUsersChar ",allUsersChar);
    

   


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

function sortPreference(obj){
    console.log("sortPref ", obj);
    
    let arr = [];
    arr.push({value : obj.blue, color: "blue"})
    arr.push({value : obj.yellow, color: "yellow"})
    arr.push({value : obj.red, color: "red"})
    arr.push({value : obj.green, color: "green"})
    
    arr.sort((a,b) => (a.value > b.value) ? -1 : ((b.value > a.value) ? 1 : 0))
    return arr;
}


module.exports.getTop10 = getTop10;