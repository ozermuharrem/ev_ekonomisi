const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const KategoriSchema = new Schema({
    name : {
        type: String,
        unique : true,
        required : true
    },
    slug : {
        type : String,
        unique : true
    }
})

KategoriSchema.pre('save', function(next){
    this.slug = slugify(this.name, {
        lower : false,
        strict:true
    })
    next();
})

const Kategori = mongoose.model('kategori', KategoriSchema);

module.exports = Kategori;