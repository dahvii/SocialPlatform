const mongoose = require('mongoose');

const modelName = 'ForumPost';

const schema = {
    owner:String,   
    likes:int,
    comments:[],
    timestamp:Date,
    titel:String,
    text:String,
    typ:String
};

module.exports = mongoose.model(modelName, schema);