const Kategori = require('../models/Kategori');

exports.createKategori = async (req,res) => {
    const kategori = await Kategori.create(req.body);
    try {
        
        res.status(201).json({
            status : 'kategori oluşturma başarılı',
            kategori
        })
        
    } catch (error) {
        res.status(400).json({
            status : 'kategori oluşturulamadı',
            error
        })
    }
}