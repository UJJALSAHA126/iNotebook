const express = require('express');
const router = express.Router();


router.get('/',(req, res)=>{
    obj = {
        name: 'Mahasweta Ghatak',
        husband:'Ujjal Saha'
    }
    res.send(obj);
})



module.exports = router;