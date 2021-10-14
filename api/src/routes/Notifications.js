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
    const {id, data} = req.body;
    console.log(req.body)
    console.log(data)
    console.log(id)
    Notifications.create({
        id :id, 
        data: data.id
        
    })
    .then(doneTemp=>{
        res.status(200).json(doneTemp)
         
//             const {data}=doneTemp.dataValues
//             const idPago=axios.get(`https://api.mercadopago.com/v1/payments/${data.id}`)
//             .then(res=>{
//                 const {payer,title, unitPrice, card, transactionDetails,payment_method_id,date_approved,date_last_updated}=res.dataValues
//                 const newPayment = axios.post('/payments/NewPayment',{payer,title, unitPrice, card, transactionDetails,payment_method_id,date_approved,date_last_updated})    
//         })
//     })
   
   
    
    }).catch(error=>{ res.send(error)})
 });

module.exports = router;
// {
//      action: 'payment.created',
//        api_version: 'v1',
//        data: { id: '1242368236' },
//       date_created: '2021-10-14T20:15:00Z',
//       id: 100008706566,
//      live_mode: false,
//    type: 'payment',
//        user_id: '246910716'
//    }