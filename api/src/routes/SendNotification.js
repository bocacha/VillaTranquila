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

     

    var mailOptions = {
        from: 'VILLA TRANQUILA',
        to: email,
        subject: 'Reserva',
        text:`Hola ${username}! Tienes una reserva a nombre de ${name} en Villa Tranquila para el día ${date}, haz un pago para reservar tu fecha`,
        
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
