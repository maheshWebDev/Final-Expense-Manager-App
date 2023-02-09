const express = require('express');

const cors = require('cors');

const db = require('./config/dbconfig');

const User = require('./model/user')

const userRoute = require('./router/userRoute');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use('/user',userRoute);


// db sync

db.sync().then().catch((err)=>{console.log(err)});

app.listen(3000,()=>{
    console.log("server is running...!")
})