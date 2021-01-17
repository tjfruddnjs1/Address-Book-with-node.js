const express = require('express');

const Contact = require('../models/contact');
const router = express.Router();

router.route('/')
    .get(async (req,res,next)=>{
        try{
            const contacts = await Contact.findAll({});
            res.render('contacts/index', {contacts : contacts});
        }catch(err){
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
            res.redirect('/contacts');
            res.status(201).json(contact);
        }catch(err){
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

router.get('/:id/edit', async(req,res,next)=>{
    try{
        const contact = await Contact.findByPk(req.params.id);
        res.render('contacts/edit', {contact : contact});
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.route('/:id')
    .get(async (req,res,next)=>{
        try{
            const contact = await Contact.findByPk(req.params.id);
            res.render('contacts/show',{contact:contact});
        }catch(err){
            console.error(err);
            next(err);
        }
    })

    .put(async (req,res,next)=>{
        try{
            const contact = await Contact.update({
               name : req.body.name,
               email : req.body.email,
               phone : req.body.phone,
            },
            {
                where: {id : req.params.id },
            });
            res.redirect('/contacts');
            res.json(contact);
        }catch(err){
            console.error(err);
            next(err);
        }
    })

    .delete(async (req,res,next)=>{
        try{
            const contact = await Contact.destroy({
                where : {id:req.params.id},
            });
            res.redirect('/contacts');
            res.json(contact);
        }catch(err){
            console.error(err);
            next(err);
        }
    });

module.exports = router;