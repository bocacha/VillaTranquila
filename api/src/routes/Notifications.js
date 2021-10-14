const { Router } = require('express');

const router = Router();
const {Notifications} = require('../db');

router.get('/', async (req, res)=>{
    const dbNotifications = await Notificationss.findAll()
    try{
        res.send(dbNotifications)
    }catch(error){
        console.log(error)
    }

})

router.post('/', async(req, res)=>{
    const {id, data} = req.body;
    Notifications.create({
        payment_id :id, 
        id: data.id
    })
    .then(doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{ res.send(error)})
});

module.exports = router;
