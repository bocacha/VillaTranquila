const nodemailer = require('nodemailer');
const { Router } = require('express');
const router = Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { User} = require('../db');

router.post('/', async (req, res) => {
    const {Email}  = req.body;
    const user = await User.findAll({where:{Email:Email}})
    if(user){
        const username = user.UserName
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
            to: Email,
            subject: 'Recuperar Contraseña',
            text:`Hola ${username}! Tienes una peticion por olvido de contraseña tu nueva contraseña es(sin las comillas) :"ax54sa5s4a",
            Luego de iniciar sesion ingresa a tu perfil y cambia tu contraseña `,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                res.status(500).send(error.message)
            } else {
                console.log("Email enviado")
                res.status(200).jsonp(req.body)
            }
        })
    }
    else{
        return error
    }
  });

  module.exports = router;
