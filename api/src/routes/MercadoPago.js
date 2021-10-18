const { Router } = require('express');
const router = Router();
// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
    access_token: 'TEST-439832133350008-100101-053d8a9498eb4e464ea236805bbc561f-97718867'
  });

//routes
router.post('/', (req, res) => {
// Crea un objeto de preferencia
console.log(req.body)
let preference = {
    items: [
      {
        description: req.body.idreserva,
        title: "Cabaña Nº"+ req.body.title,
        unit_price: parseInt(req.body.price),
        quantity: 1,
        description: req.body.name
      },
    ],   
    back_urls:{
      "success":"http://localhost:3000/",
      "failure":"http://localhost:3000/reserva/pago",
      "pending":"http://localhost:3000/reserva/pago",
    },
  //"http://app-villa-tranquila.vercel.app/%22,%22http://app-villa-tranquila.vercel.app/reserva/pago%22%22http://app-villa-tranquila.vercel.app/reserva/pago"
    auto_return: "approved",
    notification_url:"https://48381f13c519a606f7c2149ea31bd0d1.m.pipedream.net/",
 
  };
  //console.log(preference.payer)
  // router.post('/', function(req, res) {
  //   res.json({
  //     Price: parseInt(req.body.price),
  //     Status: req.query.status,
  //     MerchantOrder: req.query.merchant_order_id
  //   });
  // });
  mercadopago.preferences.create(preference)
  .then(function(response){
    console.log(response.body.init_point)
    res.redirect(response.body.init_point);
  }).catch(function(error){
    console.log(error);
  });
});

module.exports = router;
