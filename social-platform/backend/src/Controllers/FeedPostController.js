const FeedPost = require('../models/FeedPost')
const User = require('../models/User')
const Comment = require('../models/Comments')

const getOne = async (req, res) => {
    let result = await FeedPost
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
}

const getMany = async (req, res) => {
    let currentUser = await User.findById(req.params.id).populate('matches');
    let result = await FeedPost
        .find({
            $or: [
                { owner: { $in: currentUser.matches.map(match => match.person) } },
                { owner: currentUser.id }
            ]
        })
        .populate('owner')
        .populate('likes')
        .populate('comments')
        .sort({ 'timeStamp': -1 })
        .skip(parseInt(req.params.skip, 10))
        .limit(3)
    if (result.length > 2) {
        res.json({ success: true, result: result })
    }
    else if (result.length > 0 && result.length < 3) {
        res.json({ success: true, result: result, fullLength: false })
    } else {
        res.json({ error: "no more posts" })
    }
}

const likeOne = async (req, res) => {
    let post = await FeedPost.findOne({ _id: req.params.id })
    post.likes.push(req.body.id)
    post.save()
    res.json({ success: "success" })
}

const dislikeOne = async (req, res) => {
    let post = await FeedPost.findOne({ _id: req.params.id })
    post.likes.splice(post.likes.indexOf(req.body.id), 1)
    post.save()
    res.json({ success: "success" })
}

const commentOne = async (req, res) => {
    if (req.body) {
        const newComment = new Comment({
            text: req.body.text,
            post: req.body.postId,
            timeStamp: req.body.timeStamp,
            writtenBy: req.body.writtenById
        })
        newComment.save()
        let post = await FeedPost.findById({ _id: req.body.postId });
        post.comments.push(newComment);
        post.save()
        let getNewComment = await Comment.findById({ _id: newComment.id }).populate('writtenBy')
        res.status(200).json({ status: 200, newComment: getNewComment })
    } else {
        res.status(400).json({ status: 400 })
    }
}

const postOne = async (req, res) => {
    if (req.body) {
        const newPost = new FeedPost({
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
}

module.exports = {
    getOne,
    getMany,
    likeOne,
    dislikeOne,
    commentOne,
    postOne
}