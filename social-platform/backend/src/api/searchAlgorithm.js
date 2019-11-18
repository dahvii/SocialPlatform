const express = require('express');
const router = express.Router();
const User = require('../models/User')


async function getTop10(req, res) {
    console.log("innan loopen reqParams: ", req.params.id)
    let allUsers = await User
        .find()
        .populate('myCharacteristics')
        .populate('partnerCharacteristics');

        let thisUser

    allUsers.forEach(user => {
        if(user._id == req.params.id){
            thisUser = user;
            allUsers.splice(allUsers.indexOf(user), 1)
        }
    })
    

    console.log("allUsers: ", allUsers)
    console.log("thisUser: ", thisUser)

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



module.exports.getTop10 = getTop10;