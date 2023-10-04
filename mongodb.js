const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/UserDB')
.then(()=>{
    console.log('mongodb connected');
})
.catch(()=>{
    console.log('failed to connect');
})

const loginSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
       password:{
        type:String,
        required:true
    }
    // username:String,
    // email:String,
    // password:String,
})

const collection = new mongoose.model('Collection1',loginSchema)
module.exports = collection 