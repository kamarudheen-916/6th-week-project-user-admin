    const express = require('express')
    const router =  express.Router()
    const collection = require('./mongodb')
    var logoutSuceess =false
    // get loginpage
    router.get('/',(req,res)=>{
        if(req.session.loggedIn||req.session.signup){
        res.redirect('/home')
        }else
        {res.render('index',{loginErr:req.session.loggedErr,logout:logoutSuceess})
        // req.session.logoutMessage=false;
        req.session.loggedErr=false;
        logoutSuceess=false;
        }

    })
    //get home page
    router.get("/home",(req,res)=>{
        if(req.session.loggedIn || req.session.signup){
            res.render("home",{title:"home"})
        }
            else{
                res.redirect('/')
                return;
            }
        }
    )
    //post login
    router.post('/login',async(req,res)=>{
        req.session.loggedIn=false
        try{
            const check = await collection.findOne({username:req.body.username})
            if(check && check.password===req.body.password){
            req.session.loggedIn=true;
            req.session.user=check
            
                console.log(req.session.user);
                res.redirect('/home')
            }
            else{
                req.session.loggedErr=true;
                res.redirect('/')
            }
    
        } 
        catch(error){
            console.error(error);
            res.render('index',{message:'Wrong Detailes'})
        }
    })
    //get signup
    router.get('/signup',(req,res)=>{
        res.render('signup')
    })
    //post signup
    router.post('/signup',async(req,res)=>{
        
        const data = 
    
        {
            username: req.body.username,
            email:req.body.email,
            password:req.body.password,

        } 
        req.session.signup=false;
        try {
            await collection.insertMany([data])
            req.session.signup=true;
            console.log(req.session.signup);
            res.redirect('/home')
        } catch (error) {
            res.render('signup', { message: error});
        }
    })

    router.get('/user/exit',(req,res)=>{
         logoutSuceess=true;
        req.session.destroy((error)=>{
            console.log('session destroyed');
        })
       
        res.redirect('/')
    })
    
    module.exports = router