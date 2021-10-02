const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Payments} = require('../db');
const router = Router();
const config= require('../config')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req, res)=>{
    const authorizations = req.get("Authorization") 
    let token = ""
if(authorizations && authorizations.toLowerCase().startsWith("bearer")){
  token = authorizations.substring(7)
  console.log(token)
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
    const authorizations = req.get("Authorization") 
    let token = ""
if(authorizations && authorizations.toLowerCase().startsWith("bearer")){
  token = authorizations.substring(7)
  console.log(token)
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
            where: {ID: req.body.id}

        })
        .then(doneTemp=>{
            return res.status(200).json(doneTemp)
        })
        .catch(error=>{console.log(error)})
});
router.delete('/RemovePayment', (req,res) =>{
    const {id}= req.body;
    if(!id){
        return res.json({status: 404},{message:"Payment not found"})
    }
    Payments.destroy(
        {where:{ID: id}}
    ).then (doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{console.log(error)})
        
});  

module.exports = router;