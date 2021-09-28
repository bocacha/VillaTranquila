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

module.exports = router;