const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.createUser = async (req, res) => {
    try{
        const user = await User.create(req.body);

        res.status(200).json({
            status : 'başarılı',
            user
        })
    }catch(error){
        res.status(400).json({
            status : 'fail',
            error,
        })
    }
}

exports.loginUser = async (reg, res) => {
    try {
        const {email , password} = req.body;
        await User.findOne({email} , (err, user) => {
            if(user)
            {
                bcrypt.compare(password, user.password, (err, some)=>{
                    if(some)
                        res.status(200).send('login işlemi başarılı')
                })
            }
        })
        
    } catch (err) {
        res.status(400).json({
            status: 'login fail',
            err
        })
    }
}