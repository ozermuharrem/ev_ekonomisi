const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const pageRoute = require('./router/pageRoute');
const userRoute = require('./router/userRoute');
const kategoriRoute = require('./router/kategoriRoute');
const veriRoute = require('./router/veriRoute');



const app = express();



//ejs
app.set("view engine","ejs"); //app.set("view engine", "ejs");



// db 

mongoose.connect('mongodb+srv://mozer-evEkonomisi:l8TQlK55SCnOPSdG@cluster0.7pfm0dq.mongodb.net/evEconomisi?retryWrites=true&w=majority')
.then(() => {
    console.log("veri tabanına bağlandı")
})
.catch((err) => {
    console.log(err)
})

app.use(
    session({
      secret: 'my_keyboard_cat', // Buradaki texti değiştireceğiz.
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: 'mongodb+srv://mozer-evEkonomisi:l8TQlK55SCnOPSdG@cluster0.7pfm0dq.mongodb.net/evEconomisi?retryWrites=true&w=majority' })
    })
  );


//global veriable 

global.userIN = null;



//midllwear 
app.use('*', (req, res, next) =>{
    userIN = req.session.userID;
    next();
})
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))




app.use('/', pageRoute); // ok 
app.use('/users', userRoute);
app.use('/kategoris', kategoriRoute);
app.use('/userpage', veriRoute);


const port = 4242;

app.listen(port,()=>{
    console.log(`${port} port listen `)
})