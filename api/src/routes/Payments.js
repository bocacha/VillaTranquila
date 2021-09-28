const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Payments} = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req, res)=>{
    const dbPayments = await Payments.findAll()
    try{
        res.send(dbPayments)
    }catch(error){
        console.log(error)
    }
});

router.post("/NewPayment" , (req, res)=>{
    const {Amount, Date, idClient} = req.body;
    Payments.create({
      Amount, 
      Date, 
      idClient
    })
    .then(doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{ res.send(error)})
})

module.exports = router;