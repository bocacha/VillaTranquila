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
    const {Date, idClient, TotalAmount, PaydAmount} = req.body;
    Payments.create({
      TotalAmount, 
      PaydAmount,
      Date, 
      idClient
    })
    .then(doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{ res.send(error)})
})
router.put("/EditPayment", (req,res) =>{
    const {Date, idClient, TotalAmount, PaydAmount} = req.body;
    const objecttoupdate={
        Date: Date, 
        idClient: idClient, 
        TotalAmount: TotalAmount, 
        PaydAmount: PaydAmount        
    }
        Payments.update(
          objecttoupdate
        ,
        {
            where: {id: req.body.id}

        })
        .then(doneTemp=>{
            return res.status(200).json(doneTemp)
        })
        .catch(error=>{console.log(error)})
})

module.exports = router;