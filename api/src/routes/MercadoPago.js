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
        title:"Cabaña Nº" + req.body.title,
        unit_price: parseInt(req.body.price),
        quantity: 1
      },
    ],
    back_urls:{
      "success":"http://localhost:3001/",
      "failure":"http://localhost:3001/reserva/pago",
      "pending":"http://localhost:3001/reserva/pago",
    },
    payer: {
      "name":req.body.name,
      "email": req.body.email,
  },
    auto_return: "approved",
    notification_url:"https://villatranquila.herokuapp.com/notification",
  };
  
  mercadopago.preferences.create(preference)
  .then(function(response){
    res.redirect(response.body.init_point);
  }).catch(function(error){
    console.log(error);
  });
});

module.exports = router;