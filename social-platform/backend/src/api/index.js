const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const ForumPost = require('../models/ForumPost')

const dbModels = {
    user: require('../models/User'),
    forumPost: require('../models/ForumPost')
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


router.post('/api/forum', (req,res)=>{
   const newForumPost = new ForumPost({
       owner: req.body.owner,
       titel: req.body.titel,
       text: req.body.text,
       timeStamp: req.body.timeStamp
   });
   newForumPost.save();   
})


router.get('/api/forum', async (req,res)=>{
    let resoult = await dbModels.forumPost.find();
    res.json(resoult);
})

router.get('/api/onepost/:id', async (req,res)=>{
    let resoult = await dbModels.forumPost.findOne({ _id: req.params.id });
    res.json(resoult);
})




module.exports = { router };