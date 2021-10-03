const { Router} = require('express');
const bcrypt= require('bcrypt')
const { User} = require('../db');
const router = Router();
const jwt = require("jsonwebtoken")
const config = require("../config")


router.post("/", async (req, res)=>{
    const {UserName, UserPassword} = req.body;

    const user = await User.findOne({ where: { UserName: UserName } });
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(UserPassword, user.UserPasswordHashed)
    if(!(user && passwordCorrect)){
       return res.status(401).json({
            error: "invalid User or Password"
        })
    }
    const userForToken={
        name: user.FirstName,
        user: user.UserName,
        Admin: user.Admin,
        Premium: user.Premium,
        id: user.ID

    }
    const token = jwt.sign(userForToken,config.JWT_SECRET)
    res.send({
        name: user.FirstName,
        user: user.UserName,
        token
    })
})
module.exports = router;