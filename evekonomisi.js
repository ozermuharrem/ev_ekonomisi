const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const pageRoute = require('./router/pageRoute');
const userRoute = require('./router/userRoute');
const kategoriRoute = require('./router/kategoriRoute');
const veriRoute = require('./router/veriRoute');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const cron = require('node-cron');
const Gider = require('./models/Gider');
const User = require('./models/User');
const vadeMiddleware = require('./middlewear/vadeMiddleware');
const app = express();


//ejs
app.set("view engine","ejs"); //* app.set("view engine", "ejs");



//? db 

mongoose.connect('mongodb://localhost:27017/ev_eko_db')
.then(() => {
    console.log("veri tabanına bağlandı")
})
.catch((err) => {
    console.log(err)
})

app.use(
    session({
        secret: 'my_keyboard_cat', // ? Buradaki texti değiştireceğiz.
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/ev_eko_db'})
    })
);


// ! global veriable 

global.userIN = null;

// * midllwear 
app.use('*', (req, res, next) =>{
    userIN = req.session.userID;
    next();
})
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(
    methodOverride('_method', {
      methods: ['POST', 'GET'],
    })
  );
app.use(flash());
app.use((req,res,next)=>{
    res.locals.flashMesaj = req.flash();
    next();
})



app.use('/', pageRoute);
app.use('/users', userRoute);
app.use('/kategoris', kategoriRoute);
app.use('/userpage', veriRoute);


cron.schedule('0 10 * * *',  function(){ // min hour day mount yeark
    let suankiZaman = new Date();
    let suanki;

    if(suankiZaman.getMonth() < 9)
        suanki = `${suankiZaman.getFullYear()}-0${suankiZaman.getMonth()+1}-${suankiZaman.getDate()}`;
    else
        suanki = `${suankiZaman.getFullYear()}-${suankiZaman.getMonth()+1}-${suankiZaman.getDate()}`;

    Gider.find({vade: {$gte: suanki ,$lte: suanki}}, function(err, docs) {
        if (!err) {
            let i = 0;
            while(i < docs.length)
            {
                if(i == 0)
                {
                    User.findOne({_id:docs[i].user}, function(err,user)
                    {
                        if(!err){
                            Gider.find({$and : [{user:user},{vade:suanki}]}, function(err,data){
                                if(!err)
                                    vadeMiddleware(user, data);
                                else
                                    console.log(err);
                            })
                        }
                        else
                            console.log(err);
                    })
                }  
                else if(i > 0 && JSON.stringify(docs[i].user) != JSON.stringify(docs[i-1].user))
                {
                    console.log("i nin degeri => " + i)
                    User.findOne({_id:docs[i].user}, function(err,user)
                    {
                        if(!err)
                        {
                            Gider.find({$and : [{user:user},{vade:suanki}]}, function(err,data){
                                if(!err)
                                    vadeMiddleware(user, data);
                                else
                                    console.log(err);
                            })
                        }
                        else
                            console.log(err);
                    })
                }
                i++;
            }
        }
        else
            console.log(err)
    }).sort({user: 1});
});


// TODO: PORT'A BAGLANMA 
const port = 4242;

app.listen(port,()=>{
    console.log(`${port} port listen `)
})
