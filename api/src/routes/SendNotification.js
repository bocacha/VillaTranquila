const nodemailer = require('nodemailer');
const { Router } = require('express');
const router = Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { cloudinary } = require('../utils/cloudinary');


router.post('/', (req, res) => {
    const {username ,name, email, date}  = req.body;

    let pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream(`reserva${name}.pdf`));
    console.log('creo el pdf')

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
         attachments: [
            {
                filename: `reserva${name}.pdf`, 
                path: doc.file(path.join(__dirname, `../../reserva${name}.pdf`)),                                       
                contentType: 'application/pdf',
            }]
    };
    console.log('path',path)

    pdfDoc.image('Villa logo.jpg');
    pdfDoc.text('-------------------------------------------------------------------------------------------------',{lineGap:10})
    pdfDoc
    .fillColor('Black')
    .text(`${mailOptions.text}`,{lineGap:10});
    pdfDoc.text('-------------------------------------------------------------------------------------------------',{lineGap:10})
    pdfDoc.text(`Ante cualquier duda puedes enviar un corre electronico a tranquilavilla79@gmail.com o bien puede comunicarte via telefonica al 358-154123456 `,{lineGap:10});
    pdfDoc.text('No olvides traer abrigo!!! Te esperamos ',{lineGap:10})
    pdfDoc.end();
    
   
   

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
