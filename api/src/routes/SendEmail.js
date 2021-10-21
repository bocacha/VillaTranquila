const nodemailer = require('nodemailer');
const { Router } = require('express');
const router = Router();

router.post("/", (req, res) => {
  const {name, tel, email, query}  = req.body;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.email',
    port: 465,
    service: 'Gmail',
    auth: {
        user: 'tranquilavilla79@gmail.com',
        pass: 'aypeadipxrbkkwdd'
    }
});
  var mailOptions = {
      form: name,
      to: email,
      subject: tel,
      text: query
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

