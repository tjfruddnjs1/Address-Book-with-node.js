const express = require('express');

const Contact = require('../models/contact');
const router = express.Router();


router.route('/')
    .get(async (req,res,next)=>{
        try{
            const contacts = await Contact.findAll({
                attributes: ["name", "email", "phone"],
            });
            res.render('contacts/index', {contacts : contacts});
        }catch(err){
            console.error(err);
            next(err);
        }
    })
    .post(async (req,res,next)=>{
        try{
            const contact = await Contact.create({
                name : req.body.name,
                email : req.body.email,
                phone : req.body.phone,
            });
            console.log(contact);
            res.status(201).json(contact);
        }catch(err){
            console.error(err);
            next(err);
        }
    });

router.get('/new', async(req, res, next)=>{
    try{
    res.render('contacts/new');
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;