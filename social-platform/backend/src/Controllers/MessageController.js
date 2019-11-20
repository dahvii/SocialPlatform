const Message = require('../models/Message')
const Match = require('../models/Match')

const getMessages = async (req, res) => {
    let result = await Message.find({
        $and: [
            {
                sender: { $in: [req.params.user, req.params.user2] }
            },
            {
                receiver: { $in: [req.params.user, req.params.user2] }
            }
        ]
    })
    res.json(result)
}

const postMessage = async (req, res) => {
    if (req.body) {
        const newMessage = new Message({
            message: req.body.message,
            sender: req.body.sender,
            receiver: req.body.receiver,
            seen: req.body.seen,
            sentAt: req.body.sentAt
        })
        newMessage.save()

        let matches = await Match.find({
            $or: [
                { matchId: req.body.sender + req.body.receiver },
                { matchId: req.body.receiver + req.body.sender }
            ]
        })

        matches.forEach((match) => {
            console.log(match)
            match.messages = newMessage
            match.updatedAt = Date.now()
            match.save()
        })


        // match.messages.push(newMessage)
        res.status(200).json({ status: 'message sent' })

    } else {
        res.status(400).json({ status: 'something went wrong' })
    }
}

const updateMessageStatus = async (req, res) => {
    let result = await Message.findOneAndUpdate({ _id: req.body.messageId }, { $set: { seen: true } })

    if (result) {
        res.json(result)
    } else {
        res.json({ error: 'Message status not updated' })
    }
}

module.exports = {
    getMessages,
    postMessage,
    updateMessageStatus
}