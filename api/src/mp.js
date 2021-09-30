const mercadopago = require ('mercadopago');
// Agrega credenciales
mercadopago.configure({
  access_token: 'PROD_ACCESS_TOKEN'
});

var payer = {
    name: "Charles",
    surname: "Luevano",
    email: "charles@hotmail.com",
    date_created: "2015-06-02T12:58:41.425-04:00",
    phone: {
      area_code: "",
      number: "949 128 866"
    },
     
    identification: {
      type: "DNI",
      number: "12345678"
    },
    
    address: {
      street_name: "Cuesta Miguel Armendáriz",
      street_number: "1004",
      zip_code: "11020"
    },
  
    items :{
      id: '1234',
      title: 'Lightweight Paper Table',
      description: 'Inspired by the classic foldable art of origami',
      category_id: 'home',
      quantity: 3,
      currency_id: 'ARS',
      unit_price: 55.41
    }
};