const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const ForumPost = require('../models/ForumPost')
const Comments = require('../models/Comments')
const multer = require('multer')
const uuid = require('uuid')
const sharp = require('sharp')
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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
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
    forumPost: require('../models/ForumPost'),
    feedPost: require('../models/FeedPost'),
    Comments: require('../models/Comments')
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
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ error: "login-error" })
        }
        //check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const sessUser = {
                    id: user._id,
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

router.get('/api/person/:id', async (req, res) => {
    let result = await dbModels["user"].findOne({ _id: req.params.id });
    const publicUser = {
        id: result._id,
        firstName: result.firstName,
        bio: result.bio,
        dateOfBirth: result.dateOfBirth,
        gender: result.gender,
        interests: result.interests,
        profilePictures: result.profilePictures
    }
    res.json(publicUser);
})

router.get('/api/currentuser/:id', async (req, res) => {
    let result = await dbModels["user"].findOne({ _id: req.params.id });
    const currentUser = {
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
    res.json(currentUser)
})

router.put('/api/update/:id', async (req, res) => {
    let result = await User.findOneAndUpdate({ _id: req.params.id }, { $set: { bio: req.body.userBio, gender: req.body.checkedGender } })

    console.log(result)
    res.json({ success: true })
})

router.get('/api/image/hej', (req, res) => {
    let pathName = path.join(__dirname, '/../../', 'uploads/resized/e5f0d5c3-9ef4-45c1-8afe-135a98186c39')
    // const { fileid } = req.params;
    console.log(pathName);
    res.sendFile(pathName);
});

router.post('/api/new-image', upload.single('feedImage'), async (req, res) => {
    if (req.file) {
        const { filename: image } = req.file
        console.log(req.file.destination, 'resized', image)
        await sharp(req.file.path)
            .resize(500, 700)
            .jpeg({ quality: 80 })
            .toFile(
                path.resolve(req.file.destination, 'resized', image)
            )
        fs.unlinkSync(req.file.path)

        res.json({ file: req.file.path, success: "it worked" })
    } else {
        res.json({ error: "something went wrong" })
    }
})

router.post('/api/new-post', async (req, res) => {
    if (req.body) {
        const newPost = new dbModels.feedPost({
            text: req.body.text,
            owner: req.body.owner,
            timeStamp: req.body.date,
            likes: req.body.likes,
            feedImage: req.body.resizedImage
        })
        newPost.save()
            .then(res.status(200).json({ status: 200 }))
    } else {
        res.status(400).json({ status: 400 })
    }
})


router.post('/api/forum', (req,res)=>{
   const newForumPost = new ForumPost({
       owner: { _id: req.session.user.id },
       titel: req.body.titel,
       text: req.body.text,
       timeStamp: Date.now(),
       isAnonym : req.body.anonym,
   });
   newForumPost.save();   
   res.json({ok: "ok"})
})

router.get('/api/forum', async (req,res)=>{
    let resoult = await dbModels.forumPost.find().populate('owner').exec();
    res.json(resoult);
})

router.get('/api/onepost/:id', async (req,res)=>{
    let resoult = await dbModels.forumPost.findById({ _id: req.params.id }).populate('owner').populate('comments').exec();
    res.json(resoult);
})

router.post('/api/onepost', async (req,res)=>{
    const newForumComments = new Comments({
        writtenBy: { _id: req.session.user.id },
        text: req.body.text,
        timeStamp: Date.now()
    });
    newForumComments.save();
    let post = await dbModels.forumPost.findById({ _id: req.body.forumPostId });
    post.comments.push(newForumComments);
    post.save();
    res.json(newForumComments)
})


router.get('/api/onepost' , async (req,res)=>{
    let resoult = await dbModels.Comments.findById({ _id: req.params.id })
    res.json(resoult);
})


router.get('/api/comment/:id', async (req,res)=>{
    let resoult = await dbModels.Comments.findById({ _id: req.params.id }).populate('writtenBy').exec();
    res.json(resoult);
    
})

module.exports = { router };