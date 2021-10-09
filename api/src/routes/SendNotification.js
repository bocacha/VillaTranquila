const nodemailer = require('nodemailer');
const { Router } = require('express');
const router = Router();

router.post('/', (req, res) => {
    const {name, email, date}  = req.body;
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.email',
      port: 465,
      secure:true,
      service: 'Gmail',
      auth: {
          user: 'tranquilavilla79@gmail.com',
          pass: 'aypeadipxrbkkwdd'
      }
  });

    transporter.verify().then(()=>{
        console.log('listo para mandar email')
    })

    var mailOptions = {
        from: 'VILLA TRANQUILA',
        to: email,
        subject: 'Reserva',
        text:`Hola ${name}! Tienes una reserva en Villa Tranquila el día ${date}. Te esperamos`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            res.status(500).send(error.message)
        } else {
            console.log("Email enviado")
            res.status(200).jsonp(req.body)
        }
    })
  });
  
  module.exports = router;
  
  