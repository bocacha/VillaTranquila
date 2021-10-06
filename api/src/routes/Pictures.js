const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pictures} = require('../db');
const config= require('../config')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req, res)=>{
    const dbPictures = await Pictures.findAll({where:{Show:true}})
    try{
        res.send(dbPictures)
    }catch(error){
        console.log(error)
    }
});
router.get("/ocultadas", async (req, res)=>{
    const dbPictures = await Pictures.findAll({where:{Show:false}})
    try{
        res.send(dbPictures)
    }catch(error){
        console.log(error)
    }
});

router.post("/NewPicture" , (req, res)=>{
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
    const {Description, Url} = req.body;
    Pictures.create({
     Description,
     Url
    })
    .then(doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{ res.send(error)})
})
router.put("/EditPicture", (req,res) =>{
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
    const {Description, Url} = req.body;
    const objecttoupdate={
        Description: Description,
        Url: Url      
    }
        Pictures.update(
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
router.put('/RemovePicture', (req,res) =>{
    const {id}= req.body;
    if(!id){
        return res.json({status: 404},{message:"Picture not found"})
    }
    Pictures.update(
        {Show:false},
        {where:{ID: id}}
    ).then (doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{console.log(error)})
        
});  
router.put('/RestorePicture', (req,res) =>{
    const {id}= req.body;
    if(!id){
        return res.json({status: 404},{message:"Picture not found"})
    }
    Pictures.update(
        {Show:true},
        {where:{ID: id}}
    ).then (doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{console.log(error)})
        
}); 
module.exports = router;