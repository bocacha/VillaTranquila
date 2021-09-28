const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Reservations} = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req, res)=>{
    const dbReservations = await Reservations.findAll()
    try{
        res.send(dbReservations)
    }catch(error){
        console.log(error)
    }
});

router.post("/NewReservation" , (req, res)=>{
    const {Checkin, Checkout, UserId, Paymentsid, Cabinid, ExtraServices} = req.body;
    Reservations.create({
     Checkin,
     Checkout,
     UserId, 
     Paymentsid, 
     Cabinid, 
     ExtraServices
    })
    .then(doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{ res.send(error)})
});
router.put("/EditCabin", (req,res) =>{
    const {Number, Capacity, Available, Price, Description} = req.body;
    const ID= req.body.id;
        Cabins.update({

            Number,
            Capacity,
            Available,
            Price,
            Description
        },
        {
            where: {id: ID}

        })
        .then(doneTemp=>{
            return res.status(200).json(doneTemp)
        })
        .catch(error=>{ res.send(error)})
})

module.exports = router;