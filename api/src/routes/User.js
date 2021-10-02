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
router.put("/EditUser", (req,res) =>{
    const {UserName, UserPassword, FirstName, LastName, Address, Phone, Email, Admin,Premium} = req.body;
    const objecttoupdate={
        UserName: UserName,
        UserPassword: UserPassword,
        FirstName: FirstName,
        LastName: LastName,
        Address: Address,
        Phone: Phone,
        Email: Email,
        Admin: Admin,
        Premium: Premium
    }
        User.update(
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
router.delete('/RemoveUser', (req,res) =>{
    const {id}= req.body;
    if(!id){
        return res.json({status: 404},{message:"User not found"})
    }
    User.destroy(
        {where:{ID: id}}
    ).then (doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{console.log(error)})
        
});  


module.exports = router;