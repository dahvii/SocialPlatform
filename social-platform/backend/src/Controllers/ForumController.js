const ForumPost = require('../models/ForumPost')
const Comments = require('../models/Comments')

const newPost = (req, res) => {
    const newForumPost = new ForumPost({
        owner: { _id: req.session.user.id },
        text: req.body.text,
        timeStamp: Date.now(),
        isAnonym: req.body.anonym,
        image: req.body.image,
    });
    newForumPost.save();
    res.json({ ok: "ok", newPost: newForumPost })
}

const getAll = async (req, res) => {
    let result = await ForumPost
        .find()
        .populate('owner')
        .sort({ 'timeStamp': -1 })
        .populate('followers')
        .exec();
    res.json(result);
}

const getOne = async (req, res) => {
    let result = await ForumPost
        .findById({ _id: req.params.id })
        .populate('owner')
        .populate('comments')
        .populate('followers')
        .exec();
    res.json(result);
}

const commentOne = async (req, res) => {
    const newForumComments = new Comments({
        writtenBy: { _id: req.session.user.id },
        text: req.body.text,
        timeStamp: Date.now()
    });
    newForumComments.save();
    let post = await ForumPost.findById({ _id: req.body.forumPostId });
    post.comments.push(newForumComments);
    post.save();
    res.json(newForumComments)
}

const getOneComment = async (req, res) => {
    let result = await Comments.findById({ _id: req.params.id }).populate('writtenBy').exec();
    res.json(result);
}

const setFollow = async (req, res) => {
    let post = await ForumPost
        .findById({ _id: req.params.id })
        .populate('owner')
        .populate('comments')
        .populate('followers')
        .exec();
    post.followers.push(req.body.id);
    post.save();
    res.json({ success: "success" });
}

const removeFollow = async (req, res) => {
    let post = await ForumPost
        .findById({ _id: req.params.id })
        .populate('owner')
        .populate('comments')
        .populate('followers')
        .exec();
    post.followers.shift(req.body.id);
    post.save();
    res.json({ success: "success" });
}

const getFollow = async (req, res) => {
    let result = await ForumPost
        .find()
        .populate('owner')
        .populate('comments')
        .sort({ 'timeStamp': -1 })
        .exec();
    result = result.filter(post => post.followers.includes(req.session.user.id))
    res.json(result);
}
module.exports = {
    newPost,
    getAll,
    getOne,
    commentOne,
    getOneComment,
    setFollow,
    removeFollow,
    getFollow
}