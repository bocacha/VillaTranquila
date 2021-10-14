const axios = require ('axios');
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

router.post('/', async(req, res)=>{

    const {id, data} = req.body;
    Notifications.create({
        payment_id :id, 
        id: data.id
    })
    .then(doneTemp=>{
        res.status(200).json(doneTemp)
    })
    .then(doneTemp=>{
        const {data} = doneTemp.dataValues
        const idpago = axios.get(`https://api.mercadopago.com/v1/payments/${data.id}`)
    })
    .then(res=>{
        const{title, unit_price, card, transaction_detail, payment_method_id, date_approved, date_last,updated} = res.dataValues
        const newPayment = axios.post('/payments/NewPayment',{

        })
    })
    .catch(error=>{ res.send(error)})
});

module.exports = router;