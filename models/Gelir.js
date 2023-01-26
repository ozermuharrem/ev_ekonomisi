
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GelirSchema = new Schema({
    gelirTuru : {
        type: String,
        required : true
    },
    gelirDescription : {
        type : String,
        required : true

    },
    gelirTutar : {
        type : Number,
        required : true
    },
    createDate : {
        type: Date,
        default : Date.now
    },
    kategori: {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Kategori'
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

const Gelir = mongoose.model('gelir', GelirSchema);

module.exports = Gelir;