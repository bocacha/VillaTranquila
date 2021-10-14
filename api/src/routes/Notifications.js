const { default: axios } = require('axios');
const { Router } = require('express');

const router = Router();
const {Notifications} = require('../db');

router.get('/', async (req, res)=>{
    const dbNotifications = await Notifications.findAll()
    try{
        res.send(dbNotifications)
    }catch(error){
        console.log(error)
    }

})

router.post('/', (req, res)=>{  
    console.log(req.body)      
    res.status(200)  
 });

module.exports = router;
