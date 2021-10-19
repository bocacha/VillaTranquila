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
try {    
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

    const dbUser = await User.findAll({where:{Blocked:false}})
    res.send(dbUser)
}catch(error){
    res.send({error : error})
}

    const dbUser = await User.findAll() 
});
router.get("/ocultados", async (req, res)=>{
    try {    
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
    
        const dbUser = await User.findAll({where:{Blocked:true}})
        res.send(dbUser)
    }catch(error){
        res.send({error : error})
    }
    
        const dbUser = await User.findAll() 
    });
    router.get('/:ID', async (req, res) => {
        const {ID} = req.params;
        try{
            const user = await User.findOne({where:{ID:ID}});
            res.send(user);
        } catch(error){
            res.send({error: error});
        }
    })

router.post("/Singup" , async (req, res)=>{
    const {UserName, UserPassword, FirstName, LastName, Address, Phone, Email} = req.body;
    console.log('asdasd');
    const UserPasswordHashed = await bcrypt.hash(UserPassword,10)
    const dbUser = await User.findOne({ where:{UserName: UserName}})
    const dbEmail = await User.findOne({ where:{Email: Email}})
    if(dbUser){
        res.status(504).send({msg:" error nombre de usuario no disponible"})

    }
    if(dbEmail){
        res.status(409).send({msg:"Error Email ya se encuentra en uso"})
    }
    if(!dbUser){
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
            console.log(doneTemp)
            return res.status(200).json(doneTemp)
        })
        .catch(error=>{
            console.log(error)
            res.status(504).json(console.log(error))})
    }
    
})
router.put("/EditProfile/:ID", async (req,res) =>{
    const {UserName, UserPassword, FirstName, LastName, Address, Phone, Email,} = req.body;
    const ID = req.params.ID;
    const user = await User.findOne({ where: { ID: ID } });
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(UserPassword, user.UserPasswordHashed)
    if(!(user && passwordCorrect)){
        alert("Contraseña incorrecta")
        return res.status(401).json({
            error: "invalid User or Password"
        })
    }
    if(ID){
        console.log('modificando usuario')
        const UserPasswordHashed = await bcrypt.hash(UserPassword,10)
        const objecttoupdate={
            UserName: UserName,
            UserPasswordHashed: UserPasswordHashed,
            FirstName: FirstName,
            LastName: LastName,
            Address: Address,
            Phone: Phone,
            Email: Email,
        }
            User.update(
              objecttoupdate
            ,
            {
                where: {ID: ID}

            })
            .then(doneTemp=>{
                return res.status(200).json(doneTemp)
            })
            .catch(error=>{console.log(error)})

    }
    res.status(404);
});

router.put("/EditUser", async (req,res) =>{
    const {UserName, UserPassword, FirstName, LastName, Address, Phone, Email, Admin,Premium} = req.body;
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
    if(UserPassword){
        const UserPasswordHashed = await bcrypt.hash(UserPassword,10)
        const objecttoupdate={
            UserName: UserName,
            UserPasswordHashed: UserPasswordHashed,
            FirstName: FirstName,
            LastName: LastName,
            Address: Address,
            Phone: Phone,
            Email: Email,
            Admin: Admin,
            Premium: Premium,
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
    }
    if(!UserPassword){
        const objecttoupdate={
        UserName: UserName,
        FirstName: FirstName,
        LastName: LastName,
        Address: Address,
        Phone: Phone,
        Email: Email,
        Admin: Admin,
        Premium: Premium,
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
    }
});

router.put('/RemoveUser', (req,res) =>{
    const {id}= req.body;
    if(!id){
        return res.json({status: 404},{message:"User not found"})
    }
    User.update(
        {Blocked:true},
        {where:{ID: id}}
    ).then (doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{console.log(error)})
        
});  
router.put('/RestoreUser', (req,res) =>{
    const {id}= req.body;
    if(!id){
        return res.json({status: 404},{message:"User not found"})
    }
    User.update(
        {Blocked:false},
        {where:{ID: id}}
    ).then (doneTemp=>{
        return res.status(200).json(doneTemp)
    })
    .catch(error=>{console.log(error)})
        
});  

module.exports = router;