const Question = require('../models/Questions')

const getQuestion = async (req, res) => {
    let result = await Question
        .find()
        .skip(parseInt(req.params.skip))
        .limit(1)
    if (result) {
        res.json(result[0])
    }
}

module.exports = {
    getQuestion
}