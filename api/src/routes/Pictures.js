const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pictures} = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req, res)=>{
    const dbPictures = await Pictures.findAll()
    try{
        res.send(dbPictures)
    }catch(error){
        console.log(error)
    }
});

router.post("/NewPicture" , (req, res)=>{
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
router.delete('/RemovePicture', (req,res) =>{
    const {id}= req.body;
    if(!id){
        return res.json({status: 404},{message:"Picture not found"})
    }
    Pictures.destroy(
        {where:{ID: id}}
    ).then (doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{console.log(error)})
        
});  

module.exports = router;