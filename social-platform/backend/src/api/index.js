const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Interest = require('../models/Interests')
const bcrypt = require('bcryptjs')
const ForumPost = require('../models/ForumPost')
const Characteristics = require('../models/Characteristics')
const Comments = require('../models/Comments')
const multer = require('multer')
const uuid = require('uuid')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const innit = require('./loadQuestions.js');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg') {
            cb(null, uuid() + ".jpg");
        } else if (file.mimetype === 'image/png') {
            cb(null, uuid() + ".png");
        }
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
    Comments: require('../models/Comments'),
    questions: require('../models/Questions'),
    characteristics: require('../models/Characteristics')
}

innit.loadJson();

router.post('/api/register', async (req, res) => {
    let user = await User.findOne({ email: req.body.email }).catch();
    if (user) {
        return res.status(400).json({ email: "email används redan" });
    }
    const myCharacteristics = await new Characteristics({}).save()
    const partnerCharacteristics = await new Characteristics({}).save()

    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: '',
        hometown: '',
        dateOfBirth: req.body.dateOfBirth,
        bio: '',
        questionsAnswered: 0,
        myCharacteristics,
        partnerCharacteristics

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
        hometown: result.hometown,
        gender: result.gender,
        interests: result.interests,
        profilePictures: result.profilePictures
    }
    res.json(publicUser);
})

router.get('/api/currentuser/:id', async (req, res) => {
    let result = await dbModels["user"]
        .findOne({ _id: req.params.id })
        .populate('interests')
        .populate('characteristics');
    const currentUser = {
        id: result._id,
        firstName: result.firstName,
        bio: result.bio,
        dateOfBirth: result.dateOfBirth,
        gender: result.gender,
        characteristics: result.characteristics,
        interests: result.interests,
        matches: result.matches,
        profilePictures: result.profilePictures,
        likes: result.likes,
        rejects: result.rejects,
        questionsAnswered: result.questionsAnswered,
        myCharacteristics: result.myCharacteristics,
        partnerCharacteristics: result.partnerCharacteristics
    }
    res.json(currentUser)
})

router.get('/api/feed-post/:id', async (req, res) => {
    let result = await dbModels['feedPost']
        .findOne({ _id: req.params.id })
        .populate('owner')
        .populate('likes')
        .populate('comments')
        .populate({
            path: 'comments',
            populate: {
                path: 'writtenBy',
                model: 'User'
            }
        })
    if (result) {
        res.json(result)
    } else {
        res.json({ error: "no post found" })
    }
});

router.get('/api/questions/:skip', async (req, res) => {
    let result = await dbModels['questions']
        .find()
        .skip(parseInt(req.params.skip, 10))
        .limit(1)
    if (result) {
        res.json(result[0])
    }
})


router.get('/api/feed-posts/:skip', async (req, res) => {
    let result = await dbModels['feedPost']
        .find({})
        .populate('owner')
        .populate('likes')
        .populate('comments')
        .sort({ 'timeStamp': -1 })
        .skip(parseInt(req.params.skip, 10))
        .limit(3)
    if (result.length > 0) {
        res.json({ success: true, result: result })
    } else {
        res.json({ error: "no more posts" })
    }
});

router.put('/api/update/:id', async (req, res) => {
    let interests = await Interest.find({ name: { $in: req.body.userInterests.map(interest => interest.name) } })
    let result = await User.findOneAndUpdate({ _id: req.params.id },
        {
            $set: {
                bio: req.body.userBio,
                gender: req.body.checkedGender,
                interests,
                profilePictures: req.body.imagesPaths,
                hometown: req.body.hometown
            },
        }, { upsert: true })
    if (result) {
        res.json({ success: true })
    }
})

router.put('/api/characteristics/:id', async (req, res) => {
    let char = await dbModels['characteristics'].findOne({_id: req.params.id})
    console.log(req.body.red)
    char.red += req.body.red
    char.yellow += req.body.yellow
    char.green += req.body.green
    char.blue += req.body.blue
    char.save()
    res.json({ success: true })
})

router.put('/api/feed-post/like/:id', async (req, res) => {
    let post = await dbModels['feedPost'].findOne({ _id: req.params.id })
    post.likes.push(req.body.id)
    post.save()
    res.json({ success: "success" })
})

router.put('/api/feed-post/dislike/:id', async (req, res) => {
    let post = await dbModels['feedPost'].findOne({ _id: req.params.id })
    post.likes.splice(post.likes.indexOf(req.body.id), 1)
    post.save()
    res.json({ success: "success" })
})

router.put('/api/user-question/setAnswered', async (req, res) => {
    let currentUser = await dbModels['user'].findOne({ _id: req.body.userId })
    currentUser.questionsAnswered += req.body.questionsAnswered
    currentUser.save()
})

router.put('/api/add-interest', async (req, res) => {
    let bulkOperations = []
    for (let interest of req.body) {
        let upsertDoc = {
            'updateOne': {
                'filter': { name: interest.name },
                'update': interest,
                'upsert': true
            }
        };
        bulkOperations.push(upsertDoc);
    }
    let result = await Interest.bulkWrite(bulkOperations)
    res.json(result)
})

router.get('/api/get-interests', async (req, res) => {
    let result = await Interest.find()
    res.json(result)
})

router.post('/api/new-image', upload.single('feedImage'), async (req, res) => {
    if (req.file) {
        const { filename: image } = req.file
        await sharp(req.file.path)
            .resize(400, 400)
            .jpeg({ quality: 100 })
            .toFile(
                path.resolve(req.file.destination, 'resized', image)
            )
        fs.unlinkSync(req.file.path)
        res.json({ file: req.file.destination + 'resized/' + image, success: "it worked" })
    } else {
        res.json({ error: "something went wrong" })
    }
})

router.post('/api/delete-image/', (req, res) => {
    if (!req.body.images) {
        return res.status(500).json({ msg: 'Error in delete' });
    }

    for (let img of req.body.images) {
        try {
            fs.unlinkSync(img);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
    res.json({ msg: 'Image deleted' });
})

router.post('/api/feed-post/new-comment', async (req, res) => {
    if (req.body) {
        const newComment = new dbModels.Comments({
            text: req.body.text,
            post: req.body.postId,
            timeStamp: req.body.timeStamp,
            writtenBy: req.body.writtenById
        })
        newComment.save()
        let post = await dbModels['feedPost'].findById({ _id: req.body.postId });
        post.comments.push(newComment);
        post.save()
        let getNewComment = await dbModels['Comments'].findById({ _id: newComment.id }).populate('writtenBy')
        res.status(200).json({ status: 200, newComment: getNewComment })
    } else {
        res.status(400).json({ status: 400 })
    }
})

router.post('/api/new-post', async (req, res) => {
    if (req.body) {
        const newPost = new dbModels.feedPost({
            text: req.body.text,
            owner: req.body.owner,
            timeStamp: req.body.date,
            feedImage: req.body.image
        })
        newPost.save()
            .then(res.status(200).json({ status: 200 }))
    } else {
        res.status(400).json({ status: 400 })
    }
})

router.get('/api/users', (req, res) => {
    User.find()
        .then(result => {
            let idFixedArr = [];
            result.map((user) => {
                const idFixedUser = {
                    id: user._id,
                    firstName: user.firstName,
                    bio: user.bio,
                    dateOfBirth: user.dateOfBirth,
                    gender: user.gender,
                    interests: user.interests,
                    matches: user.matches,
                    profilePictures: user.profilePictures,
                    likes: user.likes,
                    rejects: user.rejects
                }
                idFixedArr.push(idFixedUser);
            })
            res.json(idFixedArr)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/api/like/:id', async (req, res) => {
    await User.findOneAndUpdate({ _id: req.params.id }, { $push: { likes: req.body.judgedPerson } })
    res.json({ success: true })
})


router.put('/api/reject/:id', async (req, res) => {
    await User.findOneAndUpdate({ _id: req.params.id }, { $push: { rejects: req.body.judgedPerson } })
    res.json({ success: true })
})

router.put('/api/match', async (req, res) => {
    await User.findOneAndUpdate({ _id: req.body.currUser }, { $push: { matches: req.body.match } }).catch(err => res.status(400).json('Error: ' + err));
    await User.findOneAndUpdate({ _id: req.body.match }, { $push: { matches: req.body.currUser } }).catch(err => res.status(400).json('Error: ' + err));
    res.json({ success: true })
})

router.get('/api/populated/:id', async (req, res) => {
    let result = await User.findOne({ _id: req.params.id }).populate('matches').exec();
    res.json(result);
})

router.put('/api/update/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json('Updated successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/api/delete/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id }, function (err) { }).then(user => res.json('deleted successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.post('/api/forum', (req, res) => {
    const newForumPost = new ForumPost({
        owner: { _id: req.session.user.id },
        titel: req.body.titel,
        text: req.body.text,
        timeStamp: Date.now(),
        isAnonym: req.body.anonym,
        image: req.body.image,
    });
    newForumPost.save();
    res.json({ ok: "ok", newPost: newForumPost })
})

router.get('/api/forum', async (req, res) => {
    let resoult = await dbModels.forumPost.find().populate('owner').sort({ 'timeStamp': -1 }).exec();
    res.json(resoult);
})

router.get('/api/onepost/:id', async (req, res) => {
    let resoult = await dbModels.forumPost.findById({ _id: req.params.id }).populate('owner').populate('comments').exec();
    res.json(resoult);
})

router.post('/api/onepost', async (req, res) => {
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


router.get('/api/onepost', async (req, res) => {
    let resoult = await dbModels.Comments.findById({ _id: req.params.id })
    res.json(resoult);
})


router.get('/api/comment/:id', async (req, res) => {
    let resoult = await dbModels.Comments.findById({ _id: req.params.id }).populate('writtenBy').exec();
    res.json(resoult);
})


module.exports = { router };