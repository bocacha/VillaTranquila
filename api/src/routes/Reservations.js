const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Reservations } = require('../db');
const config = require('../config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req, res) => {
    //     const authorizations = req.get("Authorization") 
    //     let token = ""
    // if(authorizations && authorizations.toLowerCase().startsWith("bearer")){
    //   token = authorizations.substring(7)
    // }
    // const decodedToken= jwt.verify(token, config.JWT_SECRET)
    // if(!token || !decodedToken.id){
    //    return res.status(401).json({
    //        error:"token missing or invalid"
    //    })
    // }
    // if(!decodedToken.Admin){
    //    return res.status(400).json({error:"Ops.. No tenes permisos"})
    // }
    const dbReservations = await Reservations.findAll({ where: { Show: true } })
    try {
        res.send(dbReservations)
    } catch (error) {
        console.log(error)
    }
});
router.get("/ocultadas", async (req, res) => {
    //     const authorizations = req.get("Authorization") 
    //     let token = ""
    // if(authorizations && authorizations.toLowerCase().startsWith("bearer")){
    //   token = authorizations.substring(7)
    // }
    // const decodedToken= jwt.verify(token, config.JWT_SECRET)
    // if(!token || !decodedToken.id){
    //    return res.status(401).json({
    //        error:"token missing or invalid"
    //    })
    // }
    // if(!decodedToken.Admin){
    //    return res.status(400).json({error:"Ops.. No tenes permisos"})
    // }
    const dbReservations = await Reservations.findAll({ where: { Show: false } })
    try {
        res.send(dbReservations)
    } catch (error) {
        console.log(error)
    }
});

router.post("/NewReservation" , (req, res)=>{
    const {Checkin, Checkout, Cabinid,UserId, ExtraServices, CostoFinal,Anombrede,CabinNumber,UserName,UserDNI} = req.body;
     Reservations.create({
     Checkin,
     Checkout,
     Cabinid, 
     UserId: UserId,
     UserDNI: UserDNI,
     ExtraServices,
     CabinNumber,
     CostoFinal,
     Anombrede,
     UserName
    })
        .then(doneTemp => {
            return res.status(200).json(doneTemp)
        })
        .catch(error => { res.send(error) })
});
router.put("/EditReservation", (req, res) => {
    const authorizations = req.get("Authorization")
    let token = ""
if(authorizations && authorizations.toLowerCase().startsWith("bearer")){
  token = authorizations.substring(7)
}
const decodedToken= jwt.verify(token, config.JWT_SECRET)
if(!token || !decodedToken.id){
   return res.status(401).json({
       error:"token missing or invalid"
   })
}
if(!decodedToken.Admin){
   return res.status(400).json({error:"Ops.. No tenes permisos"})
}
    const {Checkin, Checkout, Cabinid, ExtraServices, CostoFinal,Anombrede,CabinNumber,UserDNI,UserName} = req.body;
    const objecttoupdate={
        Checkin: Checkin,
        Checkout: Checkout,
        CabinNumber: CabinNumber,
        Cabinid: Cabinid,
        CostoFinal: CostoFinal,
        ExtraServices: ExtraServices,
        UserName: UserName,
        UserDNI: UserDNI,
        Anombrede: Anombrede,
    }
    Reservations.update(
        objecttoupdate
        ,
        {
            where: { ID: req.body.id }

        })
        .then(doneTemp => {
            return res.status(200).json(doneTemp)
        })
        .catch(error => { console.log(error) })
});
router.put('/RemoveReservation', (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.json({ status: 404 }, { message: "Reservation not found" })
    }
    Reservations.update(
        { Show: false },
        { where: { ID: id } }
    ).then(doneTemp => {
        res.status(200).json(doneTemp)
    })
        .catch(error => { console.log(error) })

});
router.put('/RestoreReservation', (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(500).json({ message: "Reservation not found" })
    }
    Reservations.update(
        { Show: true },
        { where: { ID: id } }
    ).then(doneTemp => {
        return res.status(200).json(doneTemp)
    })
        .catch(error => { console.log(error) })

});

module.exports = router;