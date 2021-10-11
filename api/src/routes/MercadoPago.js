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
        title:req.body.title,
        unit_price: parseInt(req.body.price),
        quantity: 1
      },
    ],
    back_urls:{
      "success": "http://localhost:3000",
      "failure": "http://localhost:3000/reserva/pago",
      "pending": "http://localhost:3000/reserva/pago",
    },
    auto_return: "approved",
    // payer = {
    //   name: "Charles",
    //   surname: "Luevano",
    //   email: "charles@hotmail.com",
    //   date_created: "2015-06-02T12:58:41.425-04:00",
    //   phone: {
    //     area_code: "",
    //     number: "949 128 866"
    //   },
      
    //   address: {
    //     street_name: "Cuesta Miguel Armendáriz",
    //     street_number: "1004",
    //     zip_code: "11020"
    //   }
    //}
  };
  
  mercadopago.preferences.create(preference)
  .then(function(response){
    res.redirect(response.body.init_point);
  }).catch(function(error){
    console.log(error);
  });
});

module.exports = router;