const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { User} = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req, res)=>{
    const dbUser = await User.findAll()
    try{
        res.send(dbUser)
    }catch(error){
        console.log(error)
    }
});

router.post("/NewUser" , (req, res)=>{
    const {UserName, UserPassword, FirstName, LastName, Address, Phone, Email} = req.body;
    User.create({
        UserName, 
        UserPassword, 
        FirstName, 
        LastName, 
        Address, 
        Phone, 
        Email
    })
    .then(doneTemp=>{
        console.log(doneTemp)
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{ res.status(504).json(error)})
})

module.exports = router;