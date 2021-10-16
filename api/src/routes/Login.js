const { Router} = require('express');
const bcrypt= require('bcrypt')
const { User} = require('../db');
const router = Router();
const jwt = require("jsonwebtoken")
const config = require("../config")

router.post("/", async (req, res)=>{
    const {UserName, UserPassword} = req.body;
    console.log(req.body);
    const user = await User.findOne({ where: { UserName: UserName } });
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(UserPassword, user.UserPasswordHashed)
    if(!(user && passwordCorrect)){
        return res.status(401).json({
            error: "invalid User or Password"
        })
    }
    if(user.Blocked){return res.status(404).send("Error Usuario Blokeado")}
    const userForToken={
        name: user.FirstName,
        user: user.UserName,
        Admin: user.Admin,
        Premium: user.Premium,
        id: user.ID
    }
    const token = jwt.sign(userForToken,config.JWT_SECRET,{expiresIn:"15h"})
    res.send({
        userid: user.ID,
        user: user.UserName,
        admin: user.Admin,
        email: user.Email,
        token
    })
})
module.exports = router;