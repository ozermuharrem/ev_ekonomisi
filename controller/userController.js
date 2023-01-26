const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.createUser = async (req, res) => {
    try{
        const user = await User.create(req.body);

        req.flash("basarili", "Kayıt Başarılı...");
        res.status(200).redirect('/login')
    }catch(error){
        req.flash("hata", "Kayıt Başarısız...");
        res.status(400).redirect('/signup');
    }
}

exports.loginUser = (req, res) => {
    try{
        const {email , password} = req.body;
        User.findOne({email}, (err , user) => {
            if(user) {
                bcrypt.compare(password, user.password , (err , same) => {
                    if(same)
                    // user session
                        req.session.userID = user._id;
                        res.status(200).redirect('/userpage')
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            status : 'fail',
            error,
        });
    };
};

exports.logOutUser = (req,res) => {
    req.session.destroy(()=>{
        res.redirect('/');
    })
}