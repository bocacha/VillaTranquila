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
    const {
        Number,
        Capacity,
        Available,
        Price,
        Description,
        Coffe,
        Microwaves,
        Heat,
        Barbecue,
        Wifi,
        Cleaning,
        Refrigerator,
        Stove,
        Parking,    
    } = req.body;
    Cabins.create({
        Number, 
        Capacity, 
        Available, 
        Price, 
        Description,
        Coffe,
        Microwaves,
        Heat,
        Barbecue,
        Wifi,
        Cleaning,
        Refrigerator,
        Stove,
        Parking
    })
    .then(doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{ res.send(error)})
})
router.put("/EditCabin", (req,res) =>{
    const {Number, Capacity, Available, Price, Description} = req.body;
    const objecttoupdate={
        Number: Number,
        Capacity: Capacity,
        Available: Available,
        Price: Price,
        Description: Description,
        Coffe: Coffe,
        Microwaves: Microwaves,
        Heat:Heat,
        Barbecue: Barbecue,
        Wifi: Wifi,
        Cleaning: Cleaning,
        Refrigerator: Refrigerator,
        Stove: Stove,
        Parking: Parking
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