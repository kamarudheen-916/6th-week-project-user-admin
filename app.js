const express = require('express');
const path = require('path')
const session = require('express-session')
const cookieParser = require("cookie-parser");
const nocache=require("nocache");
const userRout = require('./user')
const adminRout = require('./admin');
const collection = require('./mongodb')

const app = express();

const PORT = process.env.PORT||3001

app.use(nocache())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({
    secret:'it is secreat key',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:60000}
}))
app.use(cookieParser())
app.set('view engine','hbs')
app.use('/static',express.static(path.join(__dirname,'/public')))


app.use('/',userRout);
app.use('/',adminRout)

app.listen(PORT,()=>{
    console.log(`server at http://localhost:${3001}`);
})