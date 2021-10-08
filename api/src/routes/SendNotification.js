const nodemailer = require('nodemailer');
const { Router } = require('express');
const router = Router();

router.post('/', (req, res) => {
    const {name, email, date}  = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'glenda.bergstrom96@ethereal.email',
          pass: 'p8v3X5zkFsdUBTFytw'
      }
  });
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