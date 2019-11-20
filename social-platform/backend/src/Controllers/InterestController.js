const Interest = require('../models/Interests')

const addInterest = async (req, res) => {
    let bulkOperations = []
    for (let interest of req.body) {
        let upsertDoc = {
            'updateOne': {
                'filter': { name: interest.name },
                'update': interest,
                'upsert': true
            }
        };
        bulkOperations.push(upsertDoc);
    }
    let result = await Interest.bulkWrite(bulkOperations)
    res.json(result)
}

const getInterests = async (req, res) => {
    let result = await Interest.find()
    res.json(result)
}
module.exports = {
    addInterest,
    getInterests
}