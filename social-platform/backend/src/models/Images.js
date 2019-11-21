const mongoose = require('mongoose');
const { db } = require('../loaders');
const Schema = mongoose.Schema;

let imagesSchema = new Schema({

    url: String

})

class ImagesClass {}

module.exports = db.model('Images', imagesSchema)