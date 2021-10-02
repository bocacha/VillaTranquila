const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Services} = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req, res)=>{
    const dbServices = await Services.findAll()
    try{
        res.send(dbServices)
    }catch(error){
        console.log(error)
    }
});

router.post("/NewService" , (req, res)=>{
    const {Description, Name, Price} = req.body;
    Services.create({
     Description,
     Name,
     Price,
    })
    .then(doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{ res.send(error)})
})
router.put("/EditService", (req,res) =>{
    const {Description, Name, Price} = req.body;
    const objecttoupdate={
        Description: Description,
        Name: Name,
        Price: Price     
    }
        Services.update(
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
router.delete('/RemoveService', (req,res) =>{
    const {id}= req.body;
    if(!id){
        return res.json({status: 404},{message:"Service not found"})
    }
    Services.destroy(
        {where:{ID: id}}
    ).then (doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{console.log(error)})
        
});  

module.exports = router;