const { Router } = require('express');
const router = Router();
// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
    access_token: 'TEST-1809569920933245-042220-88b3cb201a62483566af682f0c59281a-246910716'
  });

//routes
router.post('/', (req, res) => {
// Crea un objeto de preferencia

let preference = {
    items: [
      {
        title: "Cabaña Nº"+req.body.title,
        description:req.body.idreserva,
        unit_price: parseInt(req.body.price),
        quantity: 1
      },
    ],
    back_urls:{
      "success":"http://localhost:3001//notification",
      "failure":"http://localhost:3001/reserva/pago",
      "pending":"http://localhost:3001/reserva/pago",
    },
  //"http://app-villa-tranquila.vercel.app","http://app-villa-tranquila.vercel.app/reserva/pago""http://app-villa-tranquila.vercel.app/reserva/pago"
    auto_return: "approved",
    notification_url:"https://48381f13c519a606f7c2149ea31bd0d1.m.pipedream.net/",
    payer:{
      userName:req.body.userName,
      userEmail:req.body.email,
    }
  };

  // router.post('/', function(req, res) {
  //   res.json({
  //     Price: parseInt(req.body.price),
  //     Status: req.query.status,
  //     MerchantOrder: req.query.merchant_order_id
  //   });
  // });

  mercadopago.preferences.create(preference)
  .then(function(response){
    res.redirect(response.body.init_point);
  }).catch(function(error){
    console.log(error);
  });
});

module.exports = router;
