const { Router, request } = require('express');
const config= require('../config')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { User} = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req, res)=>{
try {    const authorizations = req.get("Authorization") 
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
    const dbUser = await User.findAll()
    res.send(dbUser)
}catch(error){
    res.send({error : error})
}

    const dbUser = await User.findAll() 
});

router.post("/Singup" , async (req, res)=>{
    const {UserName, UserPassword, FirstName, LastName, Address, Phone, Email} = req.body;
    const UserPasswordHashed = await bcrypt.hash(UserPassword,10)
    User.create({
        UserName, 
        UserPasswordHashed,
        FirstName, 
        LastName, 
        Address, 
        Phone, 
        Email,
    })
    .then(doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{
        console.log(error)
        res.status(504).json(error)})
})
router.put("/EditUser", (req,res) =>{
    const {UserName, UserPassword, FirstName, LastName, Address, Phone, Email, Admin,Premium, Blocked} = req.body;
    // const authorizations = req.get("Authorization") 
    //      let token = ""
    // if(authorizations && authorizations.toLowerCase().startsWith("bearer")){
    //    token = authorizations.substring(7)
    //    console.log(token)
    // }
    // const decodedToken= jwt.verify(token, config.JWT_SECRET)
    // if(!token || !decodedToken.id){
    //     return res.status(401).json({
    //         error:"token missing or invalid"
    //     })
    // }
    // if(!decodedToken.Admin){
    //     return res.status(400).json({error:"Ops.. No tenes permisos"})
    // }
    const objecttoupdate={
        UserName: UserName,
        UserPassword: UserPassword,
        FirstName: FirstName,
        LastName: LastName,
        Address: Address,
        Phone: Phone,
        Email: Email,
        Admin: Admin,
        Premium: Premium,
        Blocked: Blocked,
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
})


module.exports = router;