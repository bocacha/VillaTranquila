const { Router } = require('express');
const { CambiosReserva} = require('../db');
const router = Router();

router.get("/", async (req, res)=>{
    const dbCambios = await CambiosReserva.findAll({where:{Done:false}})
    try{
        res.send(dbCambios)
    }catch(error){
        console.log(error)
    }
});
router.get("/Done", async (req, res)=>{
    const dbCambios = await Payments.findAll({where:{Done:true}})
    try{
        res.send(dbCambios)
    }catch(error){
        console.log(error)
    }
});
router.post("/Cambios" , (req, res)=>{
    const {Original, Nuevo} = req.body;
    CambiosReserva.create({
      Original,
      Nuevo
    })
    .then(doneTemp=>{
        console.log(doneTemp)
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{ console.log(error)})
})

module.exports = router;