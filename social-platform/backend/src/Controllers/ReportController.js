const Report = require('../models/Reported')
const User = require('../models/User')
const ForumPost = require('../models/ForumPost')
const Comments = require('../models/Comments')
const FeedPost = require('../models/FeedPost')

const deleteUser = async (req, res) => {
    let result = await User.deleteOne({ _id: req.params.id })
    res.json(result);
}

const createnewRepported = (reported) => {
    if (!reported || reported.length < 1) {
        const reported = new Report();
        return reported;
    }
    return reported;
}

const reportForum = async(req, res) => {
    let post = await ForumPost.findById({ _id: req.params.id });
    let reported = await Report.find();

    if (reported.length < 1) {
        reported = createnewRepported(reported);
        reported.forumPosts.push(post);
        reported.save();
    }else{
        if(!reported[0].forumPosts.includes(post._id)){
            reported[0].forumPosts.push(post);
            reported[0].save();
        }
    }
    res.json({ reported });
}

const reportForumComment = async (req, res) => {
    let post = await Comments.findById({ _id: req.params.id });
    let reported = await Report.find();
    if (reported.length < 1) {
        reported = createnewRepported(reported);
        reported.comments.push(post);
        reported.save();
    }else{
        if(!reported[0].comments.includes(post._id)){            
            reported[0].comments.push(post);
            reported[0].save();
        }
    }    
    res.json({ reported });
}

const reportFeedPost = async (req, res) => {
    let post = await FeedPost.findById({ _id: req.params.id });
    let reported = await Report.find();
    if (reported.length < 1) {
        reported = createnewRepported(reported);
        reported.feedPosts.push(post);
        reported.save();
    }else{
        if(!reported[0].feedPosts.includes(post._id)){
            reported[0].feedPosts.push(post);
            reported[0].save();
        }
    }
    res.json({ reported });
}

const reportUser = async (req, res) => {
    let post = await User.findById({ _id: req.params.id });
    let reported = await Report.find();
    if (reported.length < 1) {
        reported = createnewRepported(reported);
        reported.persons.push(post);
        reported.save();
    }else{
        if(!reported[0].persons.includes(post._id)){
            reported[0].persons.push(post);
            reported[0].save();
        }
    }
    res.json({ reported });
}

const getReports = async (req, res) => {
    let reported = await Report.find()
    .populate('comments')
    .populate('forumPosts')
    .populate('feedPosts')
    .populate('persons')
    .exec();
    res.json(reported); 
}

const deleteForumPost = async (req, res) => {
    let result = await ForumPost.deleteOne({ _id: req.params.id })
    res.json(result);
}

const deleteForumReport = async (req, res) => {
    let reported = await Report.find();
    if(reported[0]){ 
        let index = reported[0].forumPosts.findIndex(objId => objId == req.params.id);  
        reported[0].forumPosts.splice(index,1);
        reported[0].save();
    }
    res.json(reported);
}

const deleteUserReport = async (req, res) => {
    let reported = await Report.find();
    if(reported[0]){ 
        let index = reported[0].persons.findIndex(objId => objId == req.params.id);  
        reported[0].persons.splice(index,1);
        reported[0].save();
    }
    res.json(reported);
}

const deleteComment =  async (req, res) => {
    let result = await Comments.deleteOne({ _id: req.params.id })
    res.json(result);
}

const deleteCommentReport = async (req, res) => {
    let reported = await Report.find();
    if(reported[0]){ 
        let index = reported[0].comments.findIndex(objId => objId == req.params.id);  
        reported[0].comments.splice(index,1);
        reported[0].save();
    }
    res.json(reported);
}
const deleteFeedpostReport=  async (req, res) => {
    let reported = await Report.find();
    if(reported[0]){ 
        let index = reported[0].feedPosts.findIndex(objId => objId == req.params.id);  
        reported[0].feedPosts.splice(index,1);
        reported[0].save();
    }
    res.json(reported);
}

const deleteFeedPost =  async (req, res) => {
    let result = await FeedPost.deleteOne({ _id: req.params.id })
    res.json(result);
}

module.exports = {
    deleteUser,
    reportForum,
    reportForumComment,
    reportFeedPost,
    reportUser,
    getReports,
    deleteForumPost,
    deleteForumReport,
    deleteUserReport,
    deleteComment,
    deleteCommentReport,
    deleteFeedpostReport,
    deleteFeedPost
}