const nodemailer = require('nodemailer');
const { Router } = require('express');
const router = Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');

router.post('/', (req, res) => {
    const {username ,name, email, date}  = req.body;

    let pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
    

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
        text:`Hola ${username}! Tienes una reserva a nombre de ${name} en Villa Tranquila para el día ${date},haz un pago para reservar tu fecha, Te esperamos`
    };
    pdfDoc
    .fillColor('blue')
    .text(`${mailOptions.from}`, { link: 'https://pdfkit.org/docs/guide.pdf', underline: true });
    pdfDoc.text(`${mailOptions.to}`);
    pdfDoc.text(`${mailOptions.subject}`);
    pdfDoc.text(`${mailOptions.text}`);
    pdfDoc.end();

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