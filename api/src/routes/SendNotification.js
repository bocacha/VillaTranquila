const nodemailer = require('nodemailer');
const { Router } = require('express');
const router = Router();




router.post('/', (req, res) => {
    const {username ,name, email, date}  = req.body;

   

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.email',
        port: 465,
        secure:true,
        service: 'Gmail',
        auth: {
            user: 'tranquilavilla79@gmail.com',
            pass: 'aypeadipxrbkkwdd'
        },
        

    });
  
      transporter.verify().then(()=>{
          console.log('listo para mandar email')
      })

     let fecha = new Date()

    var mailOptions = {
        from: 'VILLA TRANQUILA',
        to: email,
        subject: 'Reserva',
        text:`Villa tranquila                                                                 ${fecha}
        ____________________________________________________________________________________\n
        ____________________________________________________________________________________\n
        \n
        \n
        \n
        \n
        Hola ${username}!:\n
        
        Tienes una reserva a nombre de ${name} en Villa Tranquila para el día ${date}, haz un pago para reservar tu fecha\n
        Recuerda que puedes realizar tus pago con tu tarjeta de credito o debito con mercadopago, el interes agregado para\n 
        pagos en cuotas son los que tiene mercadopago.

        Desde ya muchas gracias.\n



        Staff de Villa tranquila

        
        
        
        `,  
    };
   
    
   
   

    transporter.sendMail(mailOptions, (error, info) => {
        console.log('llego al transporter')
        if(error) {
            res.status(500).send(error.message)
        } else {
            console.log("Email enviado")
            res.status(200).jsonp(req.body)
        }
    })
  });

  module.exports = router;
