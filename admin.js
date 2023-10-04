const express = require('express');
const router = express.Router()
const collection = require('./mongodb')
//admin login
router.get('/adminlogin',(req,res)=>{
    if(req.session.loggedin){
        res.redirect('/adminpanel')
    }else{
    res.render('adminlogin')
    }
})
// get admin panel
router.get('/adminpanel',async(req,res)=>{
    if(req.session.loggedin){
    const userdata  = await collection.find()
    res.render('adminpanel',{userdata})
    }else{
        res.redirect('/adminlogin')
    }
})
// post admin panel
router.post('/adminlogin',async(req,res)=>{
   req.session.loggedin = false
    const admindata = {
        username:'admin@123',
        password:'admin123'
    }
    if(admindata.username === req.body.username&&admindata.password===req.body.password)
    {
        req.session.loggedin=true;
        const userdata  = await collection.find()
        res.render('adminpanel',{userdata})
       
    }
    else{
        res.redirect('/adminlogin')
    }
})
//get add user
router.get('/adminpanel/adduser',(req,res)=>{
    res.render('adduser')
})
//post add user
router.post('/adminpanel/adduser',async(req,res)=>{
    const userdata = {
        username: req.body.username,
        email:req.body.email,
        password:req.body.password,
    } 
    try {
        await collection.insertMany([userdata])
        res.redirect('/adminpanel')
    } catch (error) {
        res.render('adduser')
    }
    
})

//get delete
router.get('/adminpanel/delete/:id',async(req,res)=>{
    let userId = req.params.id
    const deleteUser = await collection.deleteOne({_id:userId})
    res.redirect('/adminpanel')
})
//get edit
router.get('/adminpanel/edit/:id', async (req,res)=>{
    let userId = req.params.id;
    const userdata = await collection.findOne({_id:userId})
    res.render('edituser',{userdata}) 
})
//post edit (update)
router.post('/adminpanel/update/:id',async (req,res)=>{
    let userId = req.params.id;
    let updatedData=req.body;

    await collection.updateOne({_id:userId},
        {$set:
            {
                username:updatedData.username,
                email:updatedData.email,
                password:updatedData.password
            }})
            res.redirect('/adminpanel') 
})
 //search 
router.post('/adminpanel/search', async (req,res)=>{
    var i =0;
    const searchdata = req.body;
    console.log(searchdata);
    req.session.refresh =true;
    let userdata = await collection.find({username:{$regex:"^"+searchdata.search, $options:'i'}})
   
    console.log(`search data ${userdata}`);
     
    res.render('adminpanel',{userdata,refresh:req.session.refresh})
})
module.exports = router; 


 