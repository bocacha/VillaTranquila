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


// {
//      action: 'payment.created',
//       api_version: 'v1',
//        data: { id: '1242373304' },
//       date_created: '2021-10-14T22:34:52Z',
//        id: 100009622423,
//        live_mode: false,
//       type: 'payment',
//        user_id: '246910716'
// }


router.post('/', async(req, res)=>{  
    const {id} = req.body.data; 
    await axios.get('https://api.mercadopago.com/v1/payments/' + id)
    .then(res =>{
        console.log(res)
    })
    // const obj={

    // } 
    
    // axios.post('https://villatranquila.herokuapp.com/payments/newPayment', {obj})    
    res.status(200)  
 });

module.exports = router;
