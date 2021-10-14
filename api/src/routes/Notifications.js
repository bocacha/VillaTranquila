const { default: axios } = require('axios');
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
    console.log(data)
    Notifications.create({
        payment_id :id, 
        id: data.id
        
    })
    .then(doneTemp=>{
        res.status(200).json(doneTemp)
         
            const {data}=doneTemp.dataValues
            const idPago=axios.get(`https://api.mercadopago.com/v1/payments/${data.id}`)
            .then(res=>{
                const {payer,title, unitPrice, card, transactionDetails,payment_method_id,date_approved,date_last_updated}=res.dataValues
                const newPayment = axios.post('/payments/NewPayment',{payer,title, unitPrice, card, transactionDetails,payment_method_id,date_approved,date_last_updated})    
        })
    })
   
   
    .catch(error=>{ res.send(error)})

});

module.exports = router;
