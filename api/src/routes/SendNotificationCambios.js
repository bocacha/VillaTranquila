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
        text:`Hola ${username}! Tienes una reserva a nombre de ${name} en Villa Tranquila para el día ${date}, y solicitaste hacer cambios en la misma estos fueron aprobados`,  
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
  router.post('/NO', (req, res) => {
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
        text:`Hola ${username}! Tienes una reserva a nombre de ${name} en Villa Tranquila para el día ${date}, y solicitaste hacer cambios en la misma estos fueron Negados`,  
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
  router.post('/Error', (req, res) => {
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
        text:`Hola ${username}! Tienes una reserva a nombre de ${name} en Villa Tranquila para el día ${date}, y solicitaste hacer cambios en la misma estos fueron Negados por un error y estan siendo revisados proxmamente recibiras otro email con respecto a los cambios`,  
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
