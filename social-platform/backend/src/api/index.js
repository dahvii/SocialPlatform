const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const uuid = require('uuid')
// const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, uuid());
    }
})
const fileFilter = (req, file, cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
        cb(null, true)
    } else {
        cb(null, false)
    }
};
const upload = multer({
    storage: storage, 
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // },
    fileFilter: fileFilter
});

const dbModels = {
    user: require('../models/User'),
    feedPost: require('../models/FeedPost')
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
                lastName: req.body.lastName
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
    User.findOne({ email }).then(user => {
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
                    profilePictures: user.profilePictures,
                    interests: user.interests,
                    matches: user.matches,
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
    if (req.session.user) {
        delete req.session.user;
        res.json({ success: 'logged out' });
    } else {
        res.json({ error: 'no user logged in' })
    }
});

router.get('/api/loggedinas', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user)
    } else {
        res.json({ error: "Not logged in" })
    }
})

router.post('/api/new-image', upload.single('feedImage'), async (req, res) => {
    console.log("req.file: ", req.file);
    if(req.file){
        console.log("det funkade");
        res.json({file: req.file.path, success: "it worked"})
    } else{
        console.log("Det funkade inte");
        res.json({error: "something went wrong"})
    }
})

router.post('/api/new-post', async (req, res) => {
    console.log(req.body);
    if(req.body){
        const newPost = new dbModels.feedPost({
            text: req.body.text,
            owner: req.body.owner,
            timeStamp: req.body.date,
            likes: req.body.likes,
            feedImage: req.body.image
        })
        newPost.save()
        .then(res.status(200).json({ status: 200 }))
    } else{
        res.status(400).json({status: 400})
    }
   
    // await sharp(req.file.path)
    // .resize(500)
    // .jpeg({quality: 50})
    // .toFile(
    //     path.resolve(req.file.destination, 'resized', req.file.path)
    // )
    // fs.unlinkSync(req.file.path)

})

module.exports = { router };