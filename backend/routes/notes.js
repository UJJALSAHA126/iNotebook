const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Notes');


    console.log('Req', req.body);
})




module.exports = router;