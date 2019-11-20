const { db } = require('../loaders');
const User = require('../models/User')
const Characteristics = require('../models/Characteristics')
const Interest = require('../models/Interests')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
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
        dateOfBirth: req.body.dateOfBirth,
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
}

const login = async (req, res) => {
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
}

const logout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
        res.json({ success: 'logged out' });
    } else {
        res.json({ error: 'no user logged in' })
    }
}

const getLoggedIn = (req, res) => {
    if (req.session.user) {
        res.json(req.session.user)
    } else {
        res.json({ error: "Not logged in" })
    }
}

const getOne = async (req, res) => {
    let result = await User.findOne({ _id: req.params.id });
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
}

const getCurrentUser = async (req, res) => {
    let result = await User
        .findOne({ _id: req.params.id })
        .populate('interests')
        .populate({
            path: 'matches',
            populate: {
                path: 'person',
                model: 'User',
                select: 'firstName profilePictures'
            }
        })
        .populate({
            path: 'matches',
            populate: {
                path: 'messages',
                model: 'Message'
            }
        })
        .populate('characteristics');


    const currentUser = {
        email: result.email,
        hometown: result.hometown,
        id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
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
        partnerCharacteristics: result.partnerCharacteristics,
        admin: result.admin,
        genderPreference: result.genderPreference,
        agePreference: result.agePreference
    }
    res.json(currentUser)
}

const updateUser = async (req, res) => {
    let interests = await Interest.find({ name: { $in: req.body.userInterests.map(interest => interest.name) } })
    let result = await User.findOneAndUpdate({ _id: req.params.id },
        {
            $set: {
                bio: req.body.userBio,
                gender: req.body.checkedGender,
                interests,
                profilePictures: req.body.imagesPaths,
                hometown: req.body.hometown,
                genderPreference: req.body.genderPreference,
                agePreference: req.body.agePreference
            },
        }, { upsert: true })
    if (result) {
        res.json({ success: true })
    }
}

const setAnsweredQuestion = async (req, res) => {
    let currentUser = await User.findOne({ _id: req.body.userId })
    currentUser.questionsAnswered += req.body.questionsAnswered
    currentUser.save()
    res.json(currentUser)
}

const likeUser = async (req, res) => {
    await User.findOneAndUpdate({ _id: req.params.id }, { $push: { likes: req.body.judgedPerson } })
    res.json({ success: true })
}

const rejectUser = async (req, res) => {
    await User.findOneAndUpdate({ _id: req.params.id }, { $push: { rejects: req.body.judgedPerson } })
    res.json({ success: true })
}

const updateProfile = async (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json('Updated successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
}
module.exports = {
    register,
    login,
    logout,
    getLoggedIn,
    getOne,
    getCurrentUser,
    updateUser,
    setAnsweredQuestion,
    likeUser,
    rejectUser,
    updateProfile
}