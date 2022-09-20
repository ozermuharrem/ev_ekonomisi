const Gider = require('../models/Gider');
const Kategori = require('../models/Kategori');

exports.createGider = async (req, res) =>{

        const gider = await Gider.create(req.body);
    try {
        res.status(201).redirect('verigiris',{
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

    res.status(200).render('verigiris',{
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
