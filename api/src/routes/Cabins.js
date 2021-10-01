const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Cabins} = require('../db');
const config= require('../config')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req, res)=>{
    const dbCabins = await Cabins.findAll()
    try{
        res.send(dbCabins)
    }catch(error){
        console.log(error)
    }
});

router.post("/NewCabin" , (req, res)=>{
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
    const {Number, Capacity, Available, Price, Description} = req.body;
    Cabins.create({
        Number, 
        Capacity, 
        Available, 
        Price, 
        Description,
    })
    .then(doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{ res.send(error)})
})
router.put("/EditCabin", (req,res) =>{
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
    const {Number, Capacity, Available, Price, Description} = req.body;
    const objecttoupdate={
        Number: Number,
        Capacity: Capacity,
        Available: Available,
        Price: Price,
        Description: Description
    }
        Cabins.update(
          objecttoupdate
        ,
        {
            where: {ID: req.body.id}

        })
        .then(doneTemp=>{
            return res.status(200).json(doneTemp)
        })
        .catch(error=>{console.log(error)})
})



module.exports = router;