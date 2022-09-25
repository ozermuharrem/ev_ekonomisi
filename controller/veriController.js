const Gider = require('../models/Gider');
const Kategori = require('../models/Kategori');
const User = require('../models/User');


// exports.getEvEkoMainPage = (req, res) => {
//     res.status(200).render('evEkoMain')
// }

exports.getUserPage = async (req , res ) => {
    
    try {
        const user = await User.findOne({_id : req.session.userID});
        const veriGider = await Gider.find();
        const kategori =  await Kategori.find();
    
        res.status(200).render('userpage',{
            user,
            veriGider,
            kategori,
            page_name : "userpage",
        })
        
    } catch (error) {
        res.status(400).json({
            status : "başarısız",
            error
        })
    }

}

exports.getVeriGirisPage = (req, res) => {
    try {
        res.status(200).render('veriGiris');
    } catch (error) {
        res.status(404).json({
            status : "veriGiris Ekranına Ulaşılamadı",
            error,
        })
    }
}

exports.createGider = async (req, res) =>{

    try {
        const gider = await Gider.create(req.body);
        res.status(201).json({
            status : "başarılı",
            gider
        })
    } catch (error){
        res.status(400).json({
            status: 'gider oluşturma fail',
            error
        })
        
    }
}

exports.getAllGiders = async (req,res) => {
    try{
    const veriGider = await Gider.find();
    const kategori =  await Kategori.find();

    res.status(200).render('evEkoMain',{
            veriGider,
            kategori,
            toplam
        })
    }catch(error){
        res.status(400).json({
            status : 'file',
            error
        })
    }
}
