const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const ObjectId = require('mongodb').ObjectId

const dbModels = {
    user: require('../models/User')
}


router.post('/api/register', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "email används redan" });
        } else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: '',
                dateOfBirth: '',
                bio: ''
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(res.status(200).json({ status: 200 }))
                        .catch(err);
                });
            });
        }
    });
})

router.post('/api/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //Find user by email
    User.findOne({email}).then(user => {
        if (!user) {
            return res.status(404).json({ error: "login-error" })
        }
        //check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const sessUser = {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                    profilePictures: user.profilePictures,
                    interests: user.interests,
                    matches: user.matches,
                    bio: user.bio,
                    characteristics: user.characteristics,
                    loggedIn: true
                };
                req.session.user = sessUser;
                res.json({ msg: "logged in", sessUser, ok: true })
            } else {
                return res
                    .status(400)
                    .json({ error: "login-error" })
            }
        });
    });
});

router.delete('/api/logout', (req, res) => {
    if(req.session.user){
        delete req.session.user;
        res.json({success: 'logged out'});
    } else{
        res.json({error: 'no user logged in'})
    }
});

router.get('/api/loggedinas', (req, res) => {
    if(req.session.user){
        res.json(req.session.user)
    } else {
        res.json({error: "Not logged in"})
    }
})



router.get('/api/person/:id', async (req, res) => {
    let result = await dbModels["user"].findOne({ _id: req.params.id });
    console.log(result)
    const publicUser = {
        id: result._id,
        firstName: result.firstName,
        bio: result.bio,
        dateOfBirth: result.dateOfBirth,
        gender: result.gender,
        characteristics: result.characteristics,
        interests: result.interests,
        matches: result.matches,
        profilePictures: result.profilePictures
    }
    res.json(publicUser);
})

router.put('/api/update/:id', async (req, res) => {
    let result = await User.findOneAndUpdate({_id: req.params.id}, { $set: { bio: req.body.userBio, gender: req.body.checkedGender}})
    console.log(result)
    
})

router.get('/api/users', (req, res) => {
    User.find()
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/api/like/:id', async (req, res) => {
    let result = await User.findOneAndUpdate({_id: req.params.id}, { $push: { likes: req.body.likedUser}})
    console.log(result) 
})

/* to be continued
router.put('/api/reject/:id', async (req, res) => {
    let result = await User.findOneAndUpdate({_id: req.params.id}, { $set: { bio: req.body.userBio, gender: req.body.checkedGender}})
    console.log(result) 
})*/

router.put('/api/update/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json('Updated successfully!'))
    .catch(err => res.status(400).json('Error: ' + err));
    })

module.exports = { router };