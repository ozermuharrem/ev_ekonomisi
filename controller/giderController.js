const Gider = require('../models/Gider');
const Kategori = require('../models/Kategori');

exports.createGider = async (req, res) =>{

        const gider = await Gider.create(req.body);
    try {
        res.status(201).json({
            status : 'gider oluşturma başarılı',
            gider
        })
    } catch {
        res.status(400).json({
            status: 'gider oluşturma fail',
            error
        })
        
    }
}