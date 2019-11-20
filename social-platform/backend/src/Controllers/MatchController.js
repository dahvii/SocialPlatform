const User = require('../models/User')
const Match = require('../models/Match')

const newMatch = async (req, res) => {
    if (req.body) {
        const myMatch = new Match({
            person: req.body.match,
            match_seen: false,
            matchId: req.body.currUser + req.body.match,
        })

        const theirMatch = new Match({
            person: req.body.currUser,
            match_seen: false,
            matchId: req.body.currUser + req.body.match,
        })
        myMatch.save()
        theirMatch.save()
        await User.findOneAndUpdate({ _id: req.body.currUser }, { $push: { matches: myMatch._id } }).catch(err => res.status(400).json('Error: ' + err));
        await User.findOneAndUpdate({ _id: req.body.match }, { $push: { matches: theirMatch._id } }).catch(err => res.status(400).json('Error: ' + err))
            .then(res.status(200).json({ status: 200 }))
    } else {
        res.status(400).json({ status: 'Something went wrong' })
    }
}

const populateMatch = async (req, res) => {
    let result = await User.findOne({ _id: req.params.id }).populate('matches').exec();
    res.json(result);
}

const updateMatchStatus = async (req, res) => {
    await Match.findOneAndUpdate({ _id: req.body.matchId }, { $set: { match_seen: true } })
    res.status(200)
}

module.exports = {
    newMatch,
    populateMatch,
    updateMatchStatus
}