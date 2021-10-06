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
    const dbCabins = await Cabins.findAll({where:{Show:true}})
    try{
        res.send(dbCabins)
    }catch(error){
        console.log(error)
    }
});
router.get("/ocultadas", async (req, res)=>{
    const dbCabins = await Cabins.findAll({where:{Show:false}})
    try{
        res.send(dbCabins)
    }catch(error){
        console.log(error)
    }
});
router.get("/:id", async (req, res)=>{
    let Cabindetails = []
  if(req.params.id.length>4) { 
    try{
    let searchdetails = await Cabins.findByPk(req.params.id)
    let found = searchdetails.dataValues;
    Cabindetails.push(found)
    res.send(Cabindetails)
    } catch(error) {
            console.log(error)
        }}
    })

router.post("/NewCabin" , (req, res)=>{
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
    const {Number, Capacity, Available, Price, Description, Show, Servicios} = req.body;
    Cabins.create({
        Number, 
        Capacity, 
        Available, 
        Price, 
        Description,
        Show,
        Servicios,
    })
    .then(doneTemp=>{
        console.log(doneTemp)
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
    const {Number, Capacity, Available, Price, Description, Barbecue, Wifi, Parking} = req.body;
    const objecttoupdate={
        Number: Number,
        Capacity: Capacity,
        Available: Available,
        Price: Price,
        Description: Description,
        Barbecue: Barbecue,
        Wifi: Wifi, 
        Parking: Parking,
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
});

router.put('/RemoveCabin', (req,res) =>{
    const {id}= req.body;
    console.log(id);
    if(!id){
        return res.json({status: 404},{message:"Cabin not found"})
    }
    Cabins.update(
        {Show:false},
        {where:{ID: id}}
    ).then (doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{console.log(error)})
        
});  
router.put('/RestoreCabin', (req,res) =>{
    const {id}= req.body;
    console.log(id);
    if(!id){
        return res.json({status: 404},{message:"Cabin not found"})
    }
    Cabins.update(
        {Show:true},
        {where:{ID: id}}
    ).then (doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{console.log(error)})
        
});  


module.exports = router;