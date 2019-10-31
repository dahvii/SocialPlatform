const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')


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

    console.log(email);

    User.findOne({email: req.body.email}).then(user => {
        console.log(user)
        if(!user) {
            return res.status(404).json({ error: "login-error"})
        }
        //check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                const sessUser = {
                    id: user._id,
                    email: user.email,
                    loggedIn: true
                };
                req.session.user = sessUser;
                res.json({ msg: "logged in", sessUser, ok:true})
            } else {
                return res
                        .status(400)
                        .json({ error: "password incorrect"})
            }
        });
    });
});



module.exports = { router };