const express = require('express');
const router = express.Router();
const User = require('../models/User')
const multer = require('multer')
const uuid = require('uuid')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const Reported = require('../models/Reported')
const innit = require('./loadQuestions.js');
const loadUsers = require('./loadUsers.js');
const searchAlgorithm = require('./searchAlgorithm.js')
const FeedPostController = require('../Controllers/FeedPostController')
const UserController = require('../Controllers/UserController')
const QuestionController = require('../Controllers/QuestionsController')
const InterestController = require('../Controllers/InterestController')
const MessageController = require('../Controllers/MessageController')
const MatchController = require('../Controllers/MatchController')
const ForumController = require('../Controllers/ForumController')
const CharacteristicsController = require('../Controllers/CharacteristicsController')
const dbModels = {
    user: require('../models/User'),
    forumPost: require('../models/ForumPost'),
    feedPost: require('../models/FeedPost'),
    Comments: require('../models/Comments'),
    questions: require('../models/Questions'),
    characteristics: require('../models/Characteristics'),
    reports: require('../models/Reported'),
    Message: require('../models/Message'),
    Match: require('../models/Match')
}

// ------------ IMAGE ----------//
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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

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

// ------------ IMAGE ----------//



// -----Use to innit the questions and users (only use once pls?)-----
// innit.loadJson();
// loadUsers.loadUsers();

router.get('/api/searchAlgorithm/:id', (req, res) =>  searchAlgorithm.getTop10(req, res));

router.post('/api/register', async (req, res) => UserController.register(req, res))
    
router.post('/api/login', async (req, res) => UserController.login(req, res))

router.delete('/api/logout', async (req, res) => UserController.logout(req, res))

router.get('/api/loggedinas', async (req, res) => UserController.getLoggedIn(req, res))

router.get('/api/person/:id', async (req, res) => UserController.getOne(req, res))

router.get('/api/currentuser/:id', async (req, res) => UserController.getCurrentUser(req, res))

router.get('/api/feed-post/:id', async (req, res) => FeedPostController.getOne(req, res))

router.get('/api/feed-posts/:skip/:id', async (req, res) => FeedPostController.getMany(req, res)) 

router.put('/api/feed-post/like/:id', async (req, res) => FeedPostController.likeOne(req, res))

router.put('/api/feed-post/dislike/:id', async (req, res) => FeedPostController.dislikeOne(req, res))

router.post('/api/feed-post/new-comment', async (req, res) => FeedPostController.commentOne(req, res))

router.post('/api/new-post', async (req, res) => FeedPostController.postOne(req, res))

router.put('/api/update/:id', async (req, res) => UserController.updateUser(req, res))

router.put('/api/characteristics/:id', async (req, res) => CharacteristicsController.updateChar(req, res))

router.get('/api/questions/:skip', async (req, res) => QuestionController.getQuestion(req, res))

router.put('/api/user-question/setAnswered', async (req, res) => UserController.setAnsweredQuestion(req, res))

router.put('/api/add-interest', async (req, res) => InterestController.addInterest(req, res))

router.get('/api/get-interests', async (req, res) => InterestController.getInterests(req, res))

router.get('/api/get-messages/:user/:user2', async (req, res) => MessageController.getMessages(req, res))

router.post('/api/new-message', async (req, res) => MessageController.postMessage(req, res))

router.put('/api/like/:id', async (req, res) => UserController.likeUser(req, res))

router.put('/api/reject/:id', async (req, res) => UserController.rejectUser(req, res))

router.post('/api/match2', async (req, res) => MatchController.newMatch(req, res))
   
router.get('/api/populated/:id', async (req, res) => MatchController.populateMatch(req, res))

router.put('/api/update-match-status', async (req, res) => MatchController.updateMatchStatus(req, res))

router.put('/api/update-message-status', async (req, res) => MessageController.updateMessageStatus(req, res))

router.put('/api/update/:id', (req, res) => UserController.updateProfile(req, res))

router.post('/api/forum', (req, res) => ForumController.newPost(req, res))

router.get('/api/forum', async (req, res) => ForumController.getAll(req, res)) 

router.get('/api/onepost/:id', async (req, res) => ForumController.getOne(req, res))

router.post('/api/onepost', async (req, res) => ForumController.commentOne(req, res))

router.get('/api/comment/:id', async (req, res) => ForumController.getOneComment(req, res))

router.put('/api/addToMyFollow/:id', async (req, res) => ForumController.setFollow(req, res))

router.put('/api/removeMyFollow/:id', async (req, res) => ForumController.removeFollow(req, res)) 

router.get('/api/iFollow', async (req, res) => ForumController.getFollow(req, res))




router.delete('/api/delete/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id }, function (err) { }).then(user => res.json('deleted successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


const createnewRepported = async (reported) => {
    if (reported.length < 1) {
        const reported = new Reported();
        await reported.save()
        console.log(reported)
    }
}

//add forum post to Reported list
router.put('/api/addForumPostToReportedList/:id', async (req, res) => {
    let post = await dbModels.forumPost.findById({ _id: req.params.id });
    let reported = await dbModels['reports'].find();
    await createnewRepported(reported);
    reported[0].forumPosts.push(post);
    reported[0].save();
    res.json({ reported });

    //spära så man kan bara läga till en post en gång 
    //console.log(reported[0].filter(reported =>reported.forumPost.includes({_id: req.params.id} )));
})
/*
   router.get('/api/reportedpost', async (req, res) => {
    let reported = await dbModels['reports'].find().populate('owner').populate('comments').exec();
    await createnewRepported(reported)
    result = await dbModels['reports'].find().populate('owner').populate('comments').exec();
    console.log(result.map(obj => obj.forumPosts));
    //resoult = result.map(obj => obj.forumPosts);

    res.json(result);
   
})
 */
module.exports = { router };