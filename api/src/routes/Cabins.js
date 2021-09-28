const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Cabins} = require('../db');
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

router.put("/EditCabin", async (req,res) =>{
    const {ID,Number, Capacity, Available, Price, Description} = req.body;
    try {
        
        const response =  await Cabins.update({
            
            Number:Number,
            Capacity:Capacity,
            Available:Available,
            Price:Price,
            Description:Description
        },
        {
            where: {ID}
        
        })
        // .then(function(data){
        //     res= { success: true, data: data,message:"Upload succesfull"}
        //     return res;
        // })
        // .catch(error =>{ 
        //     res={success: false,error:error}
        //     return res;
        // })
        res.json(response);
    } catch (e) {
        console.log(e);
    }   
})

module.exports = router;