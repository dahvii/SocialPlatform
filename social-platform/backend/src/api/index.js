const express = require('express');
const router = express.Router();
const User = requre('../models/User')
const bcrypt = require('bcryptjs')


const dbModels = {
    user: require('../models/User')
}

router.post('/api/register', (req, res) => {
    
})



module.exports = { router };