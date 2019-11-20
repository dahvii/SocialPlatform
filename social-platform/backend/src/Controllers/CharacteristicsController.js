const Characteristics = require('../models/Characteristics')

const updateChar = async (req, res) => {
    let char = await Characteristics.findOne({ _id: req.params.id })
    char.red += req.body.red
    char.yellow += req.body.yellow
    char.green += req.body.green
    char.blue += req.body.blue
    char.save()
    res.json({ success: true })
}

module.exports = {
    updateChar
}