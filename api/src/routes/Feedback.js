const { Router } = require('express');
const router = Router();
const {Feedback} = require('../db');
const config= require('../config')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')

router.post("/", (req, res) => {
    const authorizations = req.get("Authorization")
    let token = ""
    if (authorizations && authorizations.toLowerCase().startsWith("bearer")) {
        token = authorizations.substring(7)
        console.log(token)
    }
    const decodedToken = jwt.verify(token, config.JWT_SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({
            error: "token missing or invalid"
        })
    }
    
    const {name, description, stars}  = req.body;
    console.log('reqboduy,',req.body);
    Feedback.create({
        Name:name, 
        Description:description,
        Stars:stars
    })
    .then(doneTemp => {
        console.log('done temp')
        return res.status(200).json(doneTemp)
    })
    .catch(error => {
        console.error(error)
        res.status(400) 
        res.send(error)
    })
});

router.get("/", async (req, res)=>{
    const dbFeedback = await Feedback.findAll({where:{Show:true}})
    try{
        res.send(dbFeedback)
    }catch(error){
        console.log(error)
    }
});
router.get("/ocultadas", async (req, res)=>{
    const dbFeedback = await Feedback.findAll({where:{Show:false}})
    try{
        res.send(dbFeedback)
    }catch(error){
        console.log(error)
    }
});

module.exports = router;
